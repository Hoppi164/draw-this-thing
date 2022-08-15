<template>
    <div>
        <h2>Drawing Pad</h2>

        <div class="p-4 ">
            <canvas height="512" width="512" class="border rounded" @mousedown="startPainting" @mousemove="draw"
                @mouseup="finishedPainting" id="canvas">
            </canvas>
        </div>
        <h4>x:{{x}}</h4>
        <h4>y:{{y}}</h4>
        <h4>xoffset:{{xoffset}}</h4>
        <h4>yoffset:{{yoffset}}</h4>
        <h5>paths:{{paths}}</h5>

    </div>
</template>
<script>


export default {
    name: "DrawingPad",
    data() {
        return {
            message: 'Hello Vue!',
            vueCanvas: null,
            painting: false,
            canvas: null,
            ctx: null,
            x: 0,
            y: 0,
            xoffset: 0,
            yoffset: 0,
            paths: [],
        }
    },
    methods: {


        startPainting(e) {
            this.painting = true;
            console.log(this.painting)
            this.draw(e)
        },

        finishedPainting() {
            this.painting = false;
            console.log(this.painting);
            this.ctx.beginPath()
        },

        draw(e) {
            const rect = this.canvas.getBoundingClientRect();
            
            this.x = e.clientX;
            this.y = e.clientY;
            this.xoffset = this.canvas.offsetLeft
            this.yoffset = this.canvas.offsetTop
            const newX = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width
            const newY = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height

            if (!this.painting) return
            console.log(this.canvas)

            this.ctx.lineWidth = 2;
            this.ctx.lineCap = "round"
            this.ctx.lineTo(newX, newY)
            this.ctx.stroke()
            this.ctx.beginPath()
            this.ctx.moveTo(newX, newY)
            this.paths.push({x: newX, y:newY})
        },




    },

    mounted() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        // Resize canvas
        // this.canvas.height = window.innerHeight;
        // this.canvas.width = window.innerWidth;
    }
};
</script>