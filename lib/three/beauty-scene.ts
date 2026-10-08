import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
export type SceneOptions={container:HTMLElement;count:number;reducedMotion:boolean;onReady:()=>void;onError:()=>void};
export function createBeautyScene({container,count,reducedMotion,onReady,onError}:SceneOptions){
 const mobile=container.clientWidth<700;
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:!mobile,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile?1.35:1.75));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 renderer.domElement.setAttribute('aria-hidden','true');container.appendChild(renderer.domElement);
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(36,1,.1,80);
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.06);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight('#fff9f5','#8e4e69',2.2));const key=new THREE.DirectionalLight('#fff6f3',4);key.position.set(4,7,6);scene.add(key);const rim=new THREE.DirectionalLight('#ffe6f2',3);rim.position.set(-5,4,-1);scene.add(rim);
 const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
 function mesh(g:THREE.BufferGeometry,m:THREE.Material){geometries.add(g);materials.add(m);return new THREE.Mesh(g,m)}
 const palette=['#e5abbc','#92bfd1','#c36f8d','#d8ac64','#c4b5bb'];
 const chrome=new THREE.MeshStandardMaterial({color:'#f7eeee',metalness:1,roughness:.16});materials.add(chrome);
 const accentChrome=new THREE.MeshStandardMaterial({color:'#bd879a',metalness:1,roughness:.2});materials.add(accentChrome);
 const points=[[0,-1.65],[.42,-1.65],[.56,-1.58],[.6,-1.43],[.6,.76],[.58,.95],[.48,1.12],[.29,1.24],[.29,1.47],[0,1.47]].map(([x,y])=>new THREE.Vector2(x,y));
 const bottleShape=new THREE.LatheGeometry(points,mobile?48:80);geometries.add(bottleShape);
 const bottles:THREE.Group[]=[];
 for(let i=0;i<count;i++){
  const group=new THREE.Group();const glass=new THREE.MeshPhysicalMaterial({color:palette[i%palette.length],metalness:.05,roughness:.12,transmission:mobile?.28:.65,thickness:.5,ior:1.47,clearcoat:1,clearcoatRoughness:.1,transparent:true,opacity:1});
  group.add(mesh(bottleShape,glass));
  const liquid=new THREE.MeshStandardMaterial({color:palette[i%palette.length],roughness:.3,metalness:.12});const fill=mesh(new THREE.CylinderGeometry(.505,.505,2.13,mobile?40:64),liquid);fill.position.y=-.35;group.add(fill);
  const cap=mesh(new THREE.CylinderGeometry(.39,.39,.98,mobile?40:64),chrome);cap.position.y=1.62;group.add(cap);
  const capTop=mesh(new THREE.CylinderGeometry(.39,.39,.07,mobile?40:64),chrome);capTop.position.y=2.13;group.add(capTop);
  const collar=mesh(new THREE.TorusGeometry(.32,.025,8,64),accentChrome);collar.rotation.x=Math.PI/2;collar.position.y=1.11;group.add(collar);
  const foot=mesh(new THREE.TorusGeometry(.505,.025,8,64),chrome);foot.rotation.x=Math.PI/2;foot.position.y=-1.54;group.add(foot);
  const label=document.createElement('canvas');label.width=512;label.height=768;const ctx=label.getContext('2d');if(ctx){ctx.clearRect(0,0,512,768);ctx.fillStyle='#38202a';ctx.textAlign='center';ctx.font='38px Georgia';ctx.fillText('ATELIER',256,160);ctx.font='100px Georgia';ctx.fillText('0'+(i+1),256,272);ctx.font='17px Arial';ctx.fillText(['THE PETAL RESET','THE BLUE HOUR','SOFT FOCUS','GOLDEN RITUAL','FIRST LIGHT'][i],256,380);ctx.font='13px Arial';ctx.fillText('BEAUTY DROP MONGOLIA',256,422);ctx.font='14px Arial';ctx.fillText('EDITORIAL CONCEPT',256,610);}
  const texture=new THREE.CanvasTexture(label);texture.colorSpace=THREE.SRGBColorSpace;textures.add(texture);const labelMaterial=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.DoubleSide});const print=mesh(new THREE.CylinderGeometry(.605,.605,2.25,32,1,true,-.62,1.24),labelMaterial);print.position.y=-.25;group.add(print);
  const halo=mesh(new THREE.TorusGeometry(.85,.075,12,mobile?56:80),new THREE.MeshPhysicalMaterial({color:'#f8dce5',roughness:.03,transmission:mobile?.1:.8,thickness:.3,clearcoat:1,metalness:.2}));halo.rotation.set(.4,.55,.2);halo.position.set(.28,-.5,-.7);halo.scale.set(1,1.7,1);group.add(halo);
  bottles.push(group);scene.add(group);
 }
 const base=mesh(new THREE.CylinderGeometry(8,8,.18,80),new THREE.MeshStandardMaterial({color:'#e6b7c6',roughness:.5,metalness:.2}));base.position.set(0,-3.4,-4.5);scene.add(base);
 let width=0,height=0,target=0,current=0,pointerX=0,pointerY=0,last=0,raf=0,disposed=false,visible=true;
 const resize=()=>{width=container.clientWidth;height=container.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.position.set(0,1,width<700?14.3:10.6);camera.lookAt(0,.12,0);camera.updateProjectionMatrix();};
 const observer=new ResizeObserver(resize);observer.observe(container);resize();
 const pointer=(event:PointerEvent)=>{if(reducedMotion||event.pointerType==='touch')return;const rect=container.getBoundingClientRect();pointerX=((event.clientX-rect.left)/rect.width-.5)*2;pointerY=((event.clientY-rect.top)/rect.height-.5)*2;};
 const reset=()=>{pointerX=0;pointerY=0;};container.addEventListener('pointermove',pointer);container.addEventListener('pointerleave',reset);
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});visibility.observe(container);
 const contextLost=(event:Event)=>{event.preventDefault();visible=false;cancelAnimationFrame(raf);onError();};renderer.domElement.addEventListener('webglcontextlost',contextLost);
 function render(time:number){if(disposed)return;raf=requestAnimationFrame(render);if(!visible||document.hidden||time-last<(mobile?33:16))return;last=time;const seconds=time*.001;current=reducedMotion?target:THREE.MathUtils.lerp(current,target,.065);
  const phase=current*(count-1)*Math.PI*2/count;
  bottles.forEach((b,i)=>{const angle=i*Math.PI*2/count-phase;const front=(Math.cos(angle)+1)/2;b.position.set(Math.sin(angle)*(width<700?3.7:4.3),.24+(reducedMotion?0:Math.sin(seconds*.65+i)*.13),Math.cos(angle)*3.4-3.4);b.rotation.set(Math.sin(angle)*.1,Math.sin(angle)*.28+(reducedMotion?0:Math.sin(seconds*.35+i)*.08),-Math.sin(angle)*.23);b.scale.setScalar(.72+front*.34);});
  camera.position.x=THREE.MathUtils.lerp(camera.position.x,pointerX*.24,.045);camera.position.y=THREE.MathUtils.lerp(camera.position.y,1+pointerY*.15,.045);camera.lookAt(0,.12,0);renderer.render(scene,camera);
 }
 renderer.render(scene,camera);onReady();raf=requestAnimationFrame(render);
 return {setProgress:(value:number)=>{target=Math.max(0,Math.min(1,value));},dispose(){disposed=true;cancelAnimationFrame(raf);observer.disconnect();visibility.disconnect();container.removeEventListener('pointermove',pointer);container.removeEventListener('pointerleave',reset);renderer.domElement.removeEventListener('webglcontextlost',contextLost);for(const t of textures)t.dispose();for(const g of geometries)g.dispose();for(const m of materials)m.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();}};
}
