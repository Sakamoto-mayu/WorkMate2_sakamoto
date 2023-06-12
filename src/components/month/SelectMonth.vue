<script setup lang="ts">
</script>

<template>
    <div class="selectMonth">
        <button>◀</button>
        <p>2023年6月</p>
        <button>▶</button>
    </div>
</template>

<style scoped>
.selectMonth {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
}

.selectMonth p {
    font-size: 25px;
    color: #977A58;
}

.selectMonth button {
    cursor: pointer;
    background-color: #fff;
    color: #977A58;
    border: none;
    font-size: 20px;
}

.selectMonth button:hover {
    opacity: 0.6;
}
</style>
