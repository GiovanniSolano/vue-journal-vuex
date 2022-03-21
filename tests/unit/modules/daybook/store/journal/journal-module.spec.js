import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mock-data/test-journal-state"

import authApi from '@/api/authApi'

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})


describe('Vuex - Pruebas en el Journal Module', () => {

    beforeAll(async() => {

        const {data} = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)

    })
   
    // Basicas

    test('Este es el estado inicial, debe de tener este state', () => {
        

        const store = createVuexStore(journalState)
        const { isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)

    })
    
    // Mutations

    test('mutation setEntries', () => {
        
        const store = createVuexStore({ isLoading: true, entries: []})

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy();


    })

    test('mutation updateEntry', () => {
        
        const store = createVuexStore(journalState)

        const storeEntries = store.state.journal.entries;

        const updatedEntry = {
            id: '-MqjrHNzRTpxUGMUPiot',
            date: 1639333040029,
            text: "Hola Mundo desde pruebas"
        }

        store.commit('journal/updateEntry', updatedEntry)

        expect(storeEntries.length).toBe(2)
        expect(storeEntries.
            find( e => e.id === updatedEntry.id)).toEqual(updatedEntry)

    })

    test('mutation addEntry deleteEntry', () => {
        
        const store = createVuexStore(journalState)

        const newEntry = {
            id: 'ABC-123',
            text: 'Hola Mundo nueva'
        }

        store.commit('journal/addEntry', newEntry)

        const storeEntries = store.state.journal.entries;

        expect(storeEntries.length).toBe(3)
        // expect(storeEntries.find(e => e.id === "ABC-123").id).toBe("ABC-123")
        expect(storeEntries.find(e => e.id === "ABC-123")).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123')

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === "ABC-123")).toBeFalsy()

    })


    // GETTERS 


    test('getters: getEntriesByterm, getEntryById', () => {
        
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('2').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('2')).toEqual([entry2])

        expect(store.getters['journal/getEntryById']('-MqjrHNzRTpxUGMUPiot')).toEqual(entry1)

    })


    // ACTIONS

    test('actions: loadEntries', async() => {
        
        const store = createVuexStore({ isLoading: true, entries: []})

        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(4)

    })

    test('actions: updateEntry', async() => {
        
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: '-MqjrHNzRTpxUGMUPiot',
            date: 1639333040029,
            text: "Hola Mundo update",
            otroCmp: true
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(
            store.state.journal.entries.find(e => e.id === updatedEntry.id)
        ).toEqual({
            id: '-MqjrHNzRTpxUGMUPiot',
            date: 1639333040029,
            text: "Hola Mundo update",
        })

    })


    test('actions: createEntry, deleteEntry', async() => {

        const store = createVuexStore(journalState)

        const newEntry = {
            date: 1639333040029,
            text: 'Esta es una nueva entrada'
        }

        const idNewEntry = await store.dispatch('journal/createEntry', newEntry)
        expect(typeof idNewEntry).toBe('string');
        expect(store.state.journal.entries.find(e => e.id === idNewEntry)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', idNewEntry)

        expect(store.state.journal.entries.find(e => e.id === idNewEntry)).toBeFalsy()


        
    })
    
})
