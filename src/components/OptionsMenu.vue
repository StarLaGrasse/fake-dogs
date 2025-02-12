<template>
	<div class="options-container">
		<div class="option-object" v-if="desktop">
			<span class="option-title" v-html="translate('font-scale')"/>
			<input class="option-slider" tabindex="0" type="range" min="1" max="2" :value="fontScale" step="0.125" id="font-scale-slider" />
		</div>
		<div class="option-object">
			<span class="option-title" v-html="translate('font-family')"/>
			<div class="option-content" tabindex="0" role="button" id="font-family" @click="toggleFont" v-on:keydown.enter="toggleFont">
				<div class="option-knob" />
				<span class="option-display" v-html="font === 0 ? translate('font-theme-first') : font === 1 ? translate('font-theme-second')  : translate('font-theme-third')" />
			</div>
		</div>
		<div class="option-object">
			<span class="option-title" v-html="translate('colors')"/>
			<div class="option-content" tabindex="0" role="button" id="font-color" @click="toggleColorScale" v-on:keydown.enter="toggleColorScale">
				<div class="option-knob" />
				<span class="option-display" v-html="colorScale === 0 ? translate('color-theme-first') : colorScale === 1 ? translate('color-theme-second') : translate('color-theme-third')" />
			</div>
		</div>
		<div class="option-object">
			<span class="option-title" v-html="translate('scanlines')"/>
			<div class="option-content" tabindex="0" role="button" id="scanline-toggle" @click="toggleScanlines" v-on:keydown.enter="toggleScanlines">
				<div class="option-knob" :class="{'selected': scanlines}" />
				<span class="option-display" v-html="scanlines ? translate('enabled') : translate('disabled')" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'OptionsMenu',
		data: function() {
			return {
				fontSlider: null,
				fontScaleMethod: null,
                root: null

			};
		},
		computed:
		{
			...mapGetters({
				scanlines: 'getScanlines',
				colorScale: 'getColorScale',
				fontScale: 'getFontScale',
                font: 'getFont',
                desktop: 'getDesktop'
			})
		},
		methods:
		{
			toggleScanlines: function () {
                this.$store.commit("setScanlines", !this.scanlines);
                this.updateOptionsCookie();
			},
			changeFontScale: function ()
			{
				if (this.fontSlider && this.root)
				{
					this.root.style.setProperty("--font-scale", this.fontSlider.value + 'px');
                    this.$store.commit("setFontScale", this.fontSlider.value);
                    this.updateOptionsCookie();
				}
			},
			toggleColorScale: function ()
			{
				if (this.root)
				{
					this.$store.commit("setColorScale", (this.colorScale + 1) % 3);
					this.root.style.setProperty("--header-bg", this.colorScale === 2 ? 'grey' : this.colorScale === 1 ? '#306230' : '#300D38');
					this.root.style.setProperty("--content-bg", this.colorScale === 1 ? '#9bbc0f' : 'white');
					this.root.style.setProperty("--accent-color", this.colorScale === 2 ? 'lightgrey' : this.colorScale === 1 ? '#8bac0f' : '#FBA919');
                    this.root.style.setProperty("--font-color", this.colorScale === 1 ? '#0f380f' : 'black');
                    this.updateOptionsCookie();
				}
			},
			toggleFont: function ()
			{
				if (this.root) {
					this.$store.commit("setFont", (this.font + 1) % 3);
					this.root.style.setProperty("--header-font", this.font === 2 ? "'Roboto Mono', monospace" : this.font === 1 ? "Dogica, monospace" : "Jellee, monospace");
					this.root.style.setProperty("--body-font", this.font === 2 ? "'Roboto Mono', monospace" : this.font === 1 ? "Dogica, monospace" : "Funtype, sans-serif");
                    this.updateOptionsCookie();
				}
            },
            updateOptionsCookie: function ()
            {
                this.writeCookie("optionsData", JSON.stringify({ "scanlines": this.scanlines, "fontScale": ((this.fontSlider && this.root) ? this.fontSlider.value : 1), "colorScale": this.colorScale, "fontFamily": this.font }), 60*24);
            }
		},
		mounted: async function () {
			this.root = document.querySelector(":root");
            this.fontSlider = document.getElementById("font-scale-slider");
            if (this.root && this.fontSlider) {
                let scale = this.root.style.getPropertyValue("--font-scale");
                scale = scale.substring(0, scale.indexOf("px"));
                scale = scale.trim();
                scale = Number(scale);
                if (!Number.isNaN(scale)) { this.fontSlider.value = scale; }
                this.fontScaleMethod = this.changeFontScale.bind(this);
                this.fontSlider.addEventListener("input", this.fontScaleMethod, { passive: true });
            }
		},
		unmounted: async function () {
            if (this.fontSlider) this.fontSlider.removeEventListener("input", this.fontScaleMethod);
		}
}</script>

<style scoped lang="scss">
    .options-container {
        color: var(--font-color);
        position: relative;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
        justify-content: flex-start;
        align-items: center;
        align-content: center;

        .option-object {
            position: relative;
            margin: 8px 16px;
            width: fit-content;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-items: flex-start;
            align-items: center;
            justify-content: flex-start;
            align-content: center;

            .option-title {
                font-family: var(--header-font);
                font-weight: 700;
                position: relative;
                font-size: font(32);
                text-align: center;
            }

            .option-content {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-items: center;
                align-items: center;
                justify-content: center;
                align-content: center;
                pointer-events: bounding-box;

                * {
                    position: relative;
                    margin: 0 8px;
                }
            }

            .option-display {
                position: relative;
                font-size: font(24);
                pointer-events: none;
            }

            .option-knob {
                width: font(32);
                height: font(32);
                border-radius: 50%;
                box-sizing: border-box;
                border: font(4) solid var(--header-bg);
                background-color: var(--header-bg);
                background-clip: border-box;

                &.selected {
                    background-color: var(--accent-color);
                }

                &:active {
                    filter: drop-shadow(1px 1px 1px var(--font-color));
                }

                filter: drop-shadow(2px 2px 2px var(--font-color));
            }

            .option-slider {
                -webkit-appearance: none;
                border-radius: 12px;
                height: 24px;
                width: 256px;
                border: none;
                background-color: var(--accent-color);
                filter: drop-shadow(2px 2px 2px var(--font-color));
            }

            .option-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                background-color: var(--header-bg);
                border-radius: 50%;
                height: 32px;
                width: 32px;
                cursor: pointer;
            }

            .option-slider::-moz-range-thumb {
                background-color: var(--header-bg);
                border-radius: 50%;
                height: 32px;
                width: 32px;
                cursor: pointer;
            }
        }
    }
</style>