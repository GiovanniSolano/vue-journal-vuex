import { createStore } from 'vuex'
import { shallowMount } from '@vue/test-utils'

import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from '@/modules/daybook/store/journal'

import { journalState } from "../../../mock-data/test-journal-state";


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Pruebas en el EntryList', () => {
    

    // Primer opcion
    // const journalMockModule = {

    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })

    // }

    // const store = createStore({
    //     modules: {
    //         journal: {... journalMockModule}
    //     }
    // })

    // Opcion mas eficiente

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper;

    beforeEach(() => {

        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

    })

    test('debe de llamar el getEntriesByTerm sin termino y mostrar dos entradas', () => {
        
        
        expect(wrapper.findAll('entry-stub').length).toBe(2)
        expect(wrapper.html()).toMatchSnapshot()


    })

    test('debe de llamar el getEntriesByTerm y filtras las entradas', async() => {
        
        const input = wrapper.find('input')
        await input.setValue('2')

        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })

    test('el boton de nuevo debe de redireccionar a /new', () => {
        
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})

    })
    
})
