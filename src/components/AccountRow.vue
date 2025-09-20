<template>      
    <BRow>
        <BCol cols="3" class="p-1">
            <BFormInput type="text" :placeholder="accountMark" max="50"
                        :model="account.mark.text"
                        @focusout="onValidate($event, 'mark')" />
        </BCol>
        <BCol cols="2" class="p-1">
            <BFormSelect v-model="selectedType" :options="types" :state="required.type"
                            value-field="value" text-field="name"
                            @change="onChangeType" />
        </BCol>
        <BCol :cols="passwordVisible ? '3' : '6'" class="p-1">
            <BFormInput type="text" :placeholder="account.login" max="100"
                        :model="account.login"
                        :state="required.login"
                        @focusout="onValidate($event, 'login')" />
        </BCol>
        <BCol cols="3" v-if="passwordVisible" class="p-1">
            <BFormInput type="password" :placeholder="account.password" max="100"
                        :model="account.password"
                        :state="required.password"
                        @focusout="onValidate($event, 'password')" />
        </BCol>
        <BCol cols="1">
            <BButton variant="light" 
                        @click="onRemoveRow(account.id)">x</BButton>
        </BCol>
    </BRow>   
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef, defineProps } from 'vue'
import { BRow, BCol, BFormSelect, BFormInput, BButton} from 'bootstrap-vue-next'
import {type InputType} from 'bootstrap-vue-next'
import { IAccount } from '@/models/AccountModel.ts'
import { useAccountStore } from '@/store/index.ts'
const store = useAccountStore()


const props = defineProps({
  account: IAccount
})

const account = ref(props.account)

const types = [
    { value: 'ldap', name: 'LDAP' },
    { value: 'local', name: 'Локальная' },    
]

const accountMark: ComputedRef<string | null> = computed(() => {
    let arr = account.value.mark ? account.value.mark.map(x => x.text) : null    
    return arr ? arr.join(';') : null;
});

const accountType: ComputedRef<string | null> = computed(() => {
    let type = account.value.type ? types.find(x => x.value == account.value.type) : null
    return type ? type.value : null;
});

const selectedType = ref(accountType.value)
const passwordVisible: ComputedRef<InputType> = computed(() => {
    return selectedType.value == 'ldap' ? false : true
})

const required = ref({
    type: selectedType.value ? null : false,
    login: null,
    password: null
})

function onRemoveRow( id: number ) {
    store.removeItem(id)
}

function onSaveRow() {
    let item = Object.assign({}, account.value) 
    item.password = selectedType.value == 'local' ? account.value.password : null
    store.changeItem(item)   
}

function onValidate(event: FocusEvent, key: string){ 
    if (event.target instanceof HTMLInputElement) {
        const inputElement = event.target as HTMLInputElement      
        required.value[key] = inputElement.value ? true : false
        const value = inputElement.value
        if (key == 'mark' && value) {
            const values = value.split(';').filter(x => x) || ''
            account.value.mark = values.map(x => {
                return { text: x }
            })
        }               
        if (Object.keys(required.value).every(x => required.value[x]))
            onSaveRow()
        else {
            Object.keys(required.value).forEach(x => {
                required.value[x] = required.value[x] ? true : false
            })
        }            
      }
}

function onChangeType(event: Event){ 
    if (event.target instanceof HTMLSelectElement) {
        const inputElement = event.target as HTMLSelectElement         
        let item = Object.assign({}, account.value)    
        const value = inputElement.value
        required.value['type'] = value ? true : false
        if(value == 'ldap')
            account.value.password = item.password = null   
        item.type = value 
        store.changeItem(item)                  
      }
}
 
</script>
