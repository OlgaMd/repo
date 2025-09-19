import { defineStore } from 'pinia';
import { ref, computed, ComputedRef } from 'vue';
import { IAccount as AccountModel } from '@/models/AccountModel';

export const useAccountStore = defineStore('account', () => {

    const localStoreItems = localStorage.getItem('storeItems')
    const storeItems = localStoreItems ? JSON.parse(localStoreItems) as AccountModel[] : null
    const items = ref(storeItems || [{
        id: 1,
        mark: [{ text: 'XXX' }],
        type: 'local',
        login: 'Значение',
        password: '111'
    },
    {
        id: 2,
        mark: [{ text: 'XXX' }, { text: 'YYYYY' }],
        type: 'local',
        login: 'Значение',
        password: '222'
    },
    {
        id: 3,
        mark: [{ text: 'Значение' }],
        type: 'local',
        login: 'Значение',
        password: '333'
    },
    {
        id: 4,
        mark: [{ text: 'Значение' }],
        type: 'ldap',
        login: 'Значение',
        password: '444'
    },
    {
        id: 5,
        mark: [{ text: 'Значение' }],
        type: 'ldap',
        login: 'Значение',
        password: '444'
        }] as AccountModel[])

    const sortItems: ComputedRef<AccountModel[]> = computed(() => {
        return items.value.sort((a, b) => a.id - b.id)
    })

    function addItemEmpty() {
        items.value.push({
            id: Math.max(...items.value.map(x => x.id)) + 1,
            mark: [{ text: '' }],
            type: '',
            login: '',
            password: ''
        })
    }
    function setItemLocal<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    function addItem(item: AccountModel) {
        items.value.push(item)
        setItemLocal('storeItems', items.value)
    }
    function removeItem (id: number) {
        items.value = items.value.filter(e => e.id !== id)
        setItemLocal('storeItems', items.value)
    }      

    function changeItem(item: AccountModel) {
        removeItem(item.id)        
        addItem(item)
    }
    return { sortItems, addItem, removeItem, addItemEmpty, changeItem }
})

