<template>
    <div class="scanline-container static-lines"/>
</template>
<script>
	export default
		{
			name: "ScanlineEffect",
			methods: {
			},
            mounted: async function () {
			},
			unmounted: async function ()
			{
			}
		}
</script>
<style scoped lang="scss">
    .scanline-container {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        justify-items: flex-end;
        align-content: center;
        align-items: center;

        &.static-lines {
            background: linear-gradient(to top, rgba(white, 0.15) 2px, rgba(white, 0) 2px);
            background-size: 100% 4px;
            background-repeat: repeat-y;
            opacity: 1;
            animation: static-flicker ease-in-out infinite 32s;
        }

        @keyframes static-flicker {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0.33;
            }

            100% {
                opacity: 1;
            }
        }

        * {
            position: relative;
            pointer-events: none;
            width: 100%;
        }

        .scanline {
            background-color: rgba(white, 0.10);
            animation: scanline-flicker ease-in-out infinite 32s;
        }

        @keyframes scanline-flicker {
            0% {
                background-color: rgba(white, 0.05);
            }

            50% {
                background-color: rgba(white, 0.15);
            }

            100% {
                background-color: rgba(white, 0.05);
            }
        }
    }
</style>