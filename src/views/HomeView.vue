<template>
    <BContainer class="bv-example-row">
        <div class="flex">
            <div class="header">Учетные записи</div>
            <BButton variant="light" @click="onCreateRow">+</BButton>
        </div>
        <AccountRow v-for="row in sortItems" :key="row.id" :account="row" />
    </BContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/store/index.ts'
const store = useAccountStore()
const { sortItems } = storeToRefs(store)

import AccountRow from '@/components/AccountRow.vue'; 
    import { BContainer, BRow, BCol, BButton } from 'bootstrap-vue-next';

function onCreateRow() {
    store.addItemEmpty()
}
</script>
<style scoped>
    .flex {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .header {
        font-size: larger;
        padding: 10px;
    }
</style>
