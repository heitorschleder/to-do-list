<template>
    <footer class="footer fixed-bottom d-flex justify-content-center align-items-center p-3">
        <p class="mb-0 me-2">Uma parceria de Heitor Schleder com</p>
        <img lazyload src="https://miro.medium.com/v2/resize:fit:700/1*qc9iypKE2wJrvM99sUZF4Q.png" alt="effecti"
            class="img-fluid logo-att" />
    </footer>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>

<style scoped>
.logo-att {
    height: 100px;
}
.footer {
    color: azure;
    background-color: #002352;
    font-size: 1.25rem;
}
</style>
