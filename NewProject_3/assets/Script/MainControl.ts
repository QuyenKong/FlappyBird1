// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainControl  extends cc.Component {

   @property(cc.Sprite)
    spBg: cc.Sprite [] = [null, null];

    @property(cc.Prefab)
    pipePrefab: cc.Prefab = null;

    pipe: cc.Node[] = [null, null, null]
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = cc.instantiate(this.pipePrefab);
            this.node.addChild(this.pipe[i]);

            this.pipe[i].x = 170 + 200 * i;
            var minY = -120;
            var maxY = 120;
            this.pipe[i].y = minY + Math.random() * (maxY - minY);
        }

        
    }
    onLoad () {
        //open Collision System
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        //open debug draw when you debug the game
        //do not forget to close when you ship the game
        collisionManager.enabledDebugDraw = true;

        // find the GameOver node, and set active property to false
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        this.spGameOver.node.active = false;
    }



    update (dt:number) {
        // move the background node
        for (let i = 0; i < this.spBg.length; i++) {
            this.spBg[i].node.x -= 1.0;
            if (this.spBg[i].node.x <= -288) {
            this.spBg[i].node.x = 288;
            }
        }

        // move pipes
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x -= 1.0;
            if (this.pipe[i].x <= -170) {
                this.pipe[i].x = 430;

                var minY = -120;
                var maxY = 120;
                this.pipe[i].y = minY + Math.random() * (maxY - minY);
            }
        }
    }

    gameOver () {
        this.spGameOver.node.active = true;
    }
}
