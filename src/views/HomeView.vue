<template>
    <BContainer class="bv-example-row">
        <BRow>
            <div class="flex my-1 px-1">
                <div class="header">Учетные записи</div>
                <BButton variant="outline-secondary" class="px-3" @click="onCreateRow">+</BButton>
            </div>
        </BRow>
        <BRow>
            <BCol cols="11" class="p-0">
                <div class="flex bg-primary-light m-1 p-2">
                    <div class="">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</div>
                </div>
            </BCol>           
        </BRow>
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
        font-weight: bold;
        padding: 10px 10px 10px 0;
    }
    .bg-primary-light {
        background-color: #eef4fa;
    }
</style>
