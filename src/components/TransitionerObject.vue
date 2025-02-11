<template>
    <transition :name="name">
        <slot></slot>
    </transition>
</template>
<script>
    export default {
        props: {
            name: {type: String, default: "fade-normal"}}
    }
</script>
<style scoped lang="scss">
    $normal-transition-weight: 0.49s;
    $light-transition-weight: 0.24s;
    $heavy-transition-weight: 0.99s;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1
        }
    }

    .fade-normal-enter-active {
        animation: fade $normal-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-normal-leave-active {
        animation: fade $normal-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .fade-light-enter-active {
        animation: fade $light-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-light-leave-active {
        animation: fade $light-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .fade-heavy-enter-active {
        animation: fade $heavy-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-heavy-leave-active {
        animation: fade $heavy-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    @keyframes fade-and-blur
    {
        0%
        {
            filter: blur(16px);
            opacity: 0;
        }
        100%
        {
            filter: blur(0);
            opacity: 1;
        }
    }

    .scaley-normal-enter-active {
        animation: scaleY $normal-transition-weight linear;
        animation-iteration-count: 1;
    }

    .scaley-normal-leave-active {
        animation: scaleY $normal-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .scaley-light-enter-active {
        animation: scaleY $light-transition-weight linear;
        animation-iteration-count: 1;
    }

    .scaley-light-leave-active {
        animation: scaleY $light-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .scaley-heavy-enter-active {
        animation: scaleY $heavy-transition-weight linear;
        animation-iteration-count: 1;
    }

    .scaley-heavy-leave-active {
        animation: scaleY $heavy-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    @keyframes scaleY {
        0%{
            transform: scaleY(0);
        }
        97.5%{
            transform: scaleY(1.25);
        }
        100%{
            transform: scaleY(1);
        }
    }

    .rise-normal-enter-active {
        animation: rise $normal-transition-weight linear;
        animation-iteration-count: 1;
    }

    .rise-normal-leave-active {
        animation: rise $normal-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .rise-light-enter-active {
        animation: rise $light-transition-weight linear;
        animation-iteration-count: 1;
    }

    .rise-light-leave-active {
        animation: rise $light-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .rise-heavy-enter-active {
        animation: rise $heavy-transition-weight linear;
        animation-iteration-count: 1;
    }

    .rise-heavy-leave-active {
        animation: rise $heavy-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    @keyframes rise {
        0% {
            transform: translateY(100%);
        }

        100% {
            transform: translateY(0%);
        }
    }

    .fade-and-blur-normal-enter-active {
        animation: fade-and-blur $normal-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-front-half-enter-active
    {
        animation: fade-and-blur $normal-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-and-blur-normal-leave-active {
        animation: fade-and-blur $normal-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .fade-and-blur-light-enter-active {
        animation: fade-and-blur $light-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-and-blur-light-leave-active {
        animation: fade-and-blur $light-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }

    .fade-and-blur-heavy-enter-active {
        animation: fade-and-blur $heavy-transition-weight linear;
        animation-iteration-count: 1;
    }

    .fade-and-blur-heavy-leave-active {
        animation: fade-and-blur $heavy-transition-weight linear;
        animation-iteration-count: 1;
        animation-direction: reverse;
    }
</style>