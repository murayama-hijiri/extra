window.addEventListener("DOMContentLoaded", init);
function init() {
    // レンダラーを作成
    const canvasElement = document.querySelector("#myCanvas"); //canvas要素のクラスを指定
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
        alpha: true,
    });

    // サイズ指定
    renderer.setPixelRatio(window.devicePixelRatio);
    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = null; //背景色を指定
    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 2;
    scene.add(ambientLight);
    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.intensity = 4.5;
    directionalLight.position.set(0, 0, 0);
    scene.add(directionalLight);
    // 下から
    const lightFront = new THREE.DirectionalLight(0xffffff, 0.5);
    lightFront.position.set(0, -5, 0);
    scene.add(lightFront);
    // 上から
    const lightTop = new THREE.DirectionalLight(0xffffff, 0.5);
    lightTop.position.set(0, 5, 0);
    scene.add(lightTop);
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    camera.position.set(0, 200, 1650);
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enableZoom = false;
    controls.mouseButtons.RIGHT = null;

    resize(); // ← 初期化時に呼び出す
    window.addEventListener("resize", resize);

    function resize() {
        const width = canvasElement.clientWidth;
        const height = canvasElement.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }
    // 3Dモデルの読み込み
    const loader = new THREE.GLTFLoader();
    let model = null;
    loader.load(
        //3Dモデルファイルのパスを指定
        "./assets/can_kv.gltf",
        function (glb) {
            model = glb.scene;
            model.name = "model_castle";
            model.scale.set(250, 250, 250);
            model.position.set(0, -35, 0);
            scene.add(glb.scene);
            model.rotation.set(
                THREE.MathUtils.degToRad(0),
                THREE.MathUtils.degToRad(-70),
                THREE.MathUtils.degToRad(-20)
            );
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.metalness = 0.8; // 非金属にする
                    child.material.roughness = 0.4; // 反射の粗さ（0だとテカり過ぎ）
                }
            });
        },
        function (error) {
            console.log(error);
        }
    );
    // リアルタイムレンダリング
    tick();
    function tick() {
        controls.update();
        directionalLight.position.copy(camera.position);
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
} //function init()の閉じカッコ
