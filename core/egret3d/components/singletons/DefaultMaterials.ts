namespace egret3d {
    /**
     * 
     */
    export class DefaultMaterials extends paper.SingletonComponent {
        /**
         * 
         */
        public static MESH_BASIC: Material;
        /**
         * 
         */
        public static MESH_BASIC_DOUBLESIDE: Material;
        /**
         * 
         */
        public static MESH_LAMBERT: Material;
        /**
         * 
         */
        public static MESH_LAMBERT_DOUBLESIDE: Material;
        /**
         * 
         */
        public static LINEDASHED_COLOR: Material;
        /**
         * 
         */
        public static MISSING: Material;
        /**
         * @internal
         */
        public static SHADOW_DEPTH: Material;
        /**
         * @internal
         */
        public static SHADOW_DISTANCE: Material;

        private _createMaterial(name: string, shader: Shader, renderQueue: paper.RenderQueue = paper.RenderQueue.Geometry) {
            const material = new Material(shader);
            material.name = name;
            material.renderQueue = renderQueue;
            material._isBuiltin = true;
            paper.Asset.register(material);

            return material;
        }

        public initialize() {
            super.initialize();

            DefaultMaterials.MESH_BASIC = this._createMaterial("builtin/meshbasic.mat.json", DefaultShaders.MESH_BASIC)
                .setTexture(DefaultTextures.WHITE);

            DefaultMaterials.MESH_BASIC_DOUBLESIDE = this._createMaterial("builtin/meshbasic_doubleside.mat.json", DefaultShaders.MESH_BASIC)
                .setTexture(DefaultTextures.WHITE)
                .setCullFace(false);

            DefaultMaterials.MESH_LAMBERT = this._createMaterial("builtin/meshlambert.mat.json", DefaultShaders.MESH_LAMBERT)
                .setTexture(DefaultTextures.WHITE);

            DefaultMaterials.MESH_LAMBERT_DOUBLESIDE = this._createMaterial("builtin/meshlambert_doubleside.mat.json", DefaultShaders.MESH_BASIC)
                .setTexture(DefaultTextures.WHITE)
                .setCullFace(false);

            DefaultMaterials.LINEDASHED_COLOR = this._createMaterial("builtin/linedashed_color.mat.json", DefaultShaders.LINEDASHED)
                .addDefine(ShaderDefine.USE_COLOR);

            DefaultMaterials.MISSING = this._createMaterial("builtin/missing.mat.json", DefaultShaders.MESH_BASIC)
                .setColor(Color.PURPLE);

            DefaultMaterials.SHADOW_DEPTH = this._createMaterial("builtin/shadow_depth.mat.json", DefaultShaders.DEPTH)
                .addDefine(ShaderDefine.DEPTH_PACKING_3201);

            DefaultMaterials.SHADOW_DISTANCE = this._createMaterial("builtin/shadow_distance.mat.json", DefaultShaders.DISTANCE_RGBA);
        }
    }
}
