namespace egret3d.ammo {
    /**
     * 
     */
    export class SliderConstraint extends TypedConstraint {
        @paper.serializedField
        protected _lowerLinearLimit: number = -10.0;
        @paper.serializedField
        protected _upperLinearLimit: number = 10.0;
        @paper.serializedField
        protected _lowerAngularLimit: number = -Math.PI;
        @paper.serializedField
        protected _upperAngularLimit: number = Math.PI;

        protected _createConstraint() {
            const rigidbody = this.gameObject.getComponent(Rigidbody);
            if (!rigidbody) {
                console.debug("Never.");
                return null;
            }

            if (!this._connectedBody) {
                console.error("The constraint need to config another rigid body.", this.gameObject.name, this.gameObject.hashCode);
                return null;
            }

            const helpMatrixA = TypedConstraint._helpMatrixA;
            const helpMatrixB = TypedConstraint._helpMatrixB;
            let btConstraint: Ammo.btSliderConstraint;

            if (this._constraintType === Ammo.ConstraintType.ConstrainToAnotherBody) {
                this._createFrames(this._axisX, this._axisY, this._anchor, helpMatrixA, helpMatrixB);
                const helpVector3A = PhysicsSystem.helpVector3A;
                const helpQuaternionA = PhysicsSystem.helpQuaternionA;
                const helpTransformA = PhysicsSystem.helpTransformA;
                const helpTransformB = PhysicsSystem.helpTransformB;
                //
                const helpQA = Matrix.getQuaternion(helpMatrixA, TypedConstraint._helpQuaternionA);
                helpVector3A.setValue(helpMatrixA.rawData[8], helpMatrixA.rawData[9], helpMatrixA.rawData[10]);
                helpQuaternionA.setValue(helpQA.x, helpQA.y, helpQA.z, helpQA.w);
                helpTransformA.setIdentity();
                helpTransformA.setOrigin(helpVector3A);
                helpTransformA.setRotation(helpQuaternionA);
                //
                const helpQB = Matrix.getQuaternion(helpMatrixB, TypedConstraint._helpQuaternionA);
                helpVector3A.setValue(helpMatrixB.rawData[8], helpMatrixB.rawData[9], helpMatrixB.rawData[10]);
                helpQuaternionA.setValue(helpQB.x, helpQB.y, helpQB.z, helpQB.w);
                helpTransformB.setIdentity();
                helpTransformB.setOrigin(helpVector3A);
                helpTransformB.setRotation(helpQuaternionA);
                //
                btConstraint = new Ammo.btSliderConstraint(
                    rigidbody.btRigidbody, this._connectedBody.btRigidbody,
                    helpTransformA, helpTransformB,
                    true
                );
            }
            else {
                this._createFrame(this._axisX, this._axisY, this._anchor, helpMatrixA)
                console.debug("btSliderConstraint TODO.");
                // TODO
                // const btConstraint = new Ammo.btSliderConstraint();
                // btConstraint.setLowerLinLimit(this._lowerLinearLimit);
                // btConstraint.setUpperLinLimit(this._upperLinearLimit);
                // btConstraint.setLowerAngLimit(this._lowerAngularLimit);
                // btConstraint.setUpperAngLimit(this._upperAngularLimit);
                // btConstraint.setBreakingImpulseThreshold(this._breakingImpulseThreshold);
                // btConstraint.setOverrideNumSolverIterations(this._overrideNumSolverIterations);
            }

            btConstraint.setLowerLinLimit(this._lowerLinearLimit);
            btConstraint.setUpperLinLimit(this._upperLinearLimit);
            btConstraint.setLowerAngLimit(this._lowerAngularLimit);
            btConstraint.setUpperAngLimit(this._upperAngularLimit);
            btConstraint.setBreakingImpulseThreshold(this._breakingImpulseThreshold);
            // btConstraint.setOverrideNumSolverIterations(this._overrideNumSolverIterations);

            return btConstraint;
        }
        /**
         * 
         */
        public get lowerLinearLimit() {
            return this._lowerLinearLimit;
        }
        public set lowerLinearLimit(value: number) {
            if (this._lowerLinearLimit === value) {
                return;
            }

            this._lowerLinearLimit = value;

            if (this._btTypedConstraint) {
                (this._btTypedConstraint as Ammo.btSliderConstraint).setLowerLinLimit(this._lowerLinearLimit);
            }
        }
        /**
         * 
         */
        public get upperLinearLimit() {
            return this._upperLinearLimit;
        }
        public set upperLinearLimit(value: number) {
            if (this._upperLinearLimit === value) {
                return;
            }

            this._upperLinearLimit = value;

            if (this._btTypedConstraint) {
                (this._btTypedConstraint as Ammo.btSliderConstraint).setUpperLinLimit(this._upperLinearLimit);
            }
        }
        /**
         * 
         */
        public get lowerAngularLimit() {
            return this._lowerAngularLimit;
        }
        public set lowerAngularLimit(value: number) {
            if (this._lowerAngularLimit === value) {
                return;
            }

            this._lowerAngularLimit = value;

            if (this._btTypedConstraint) {
                (this._btTypedConstraint as Ammo.btSliderConstraint).setLowerAngLimit(this._lowerAngularLimit);
            }
        }
        /**
         * 
         */
        public get upperAngularLimit() {
            return this._upperAngularLimit;
        }
        public set upperAngularLimit(value: number) {
            if (this._upperAngularLimit === value) {
                return;
            }

            this._upperAngularLimit = value;

            if (this._btTypedConstraint) {
                (this._btTypedConstraint as Ammo.btSliderConstraint).setUpperAngLimit(this._upperAngularLimit);
            }
        }
    }
}