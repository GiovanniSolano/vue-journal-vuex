import { shallowMount } from "@vue/test-utils";
import Fab from "@/modules/daybook/components/Fab.vue";

describe('Pruebas en el FAB component', () => {
    
    test('debe de mostar el icono por defecto', () => {
        
        //fa-plus
        const wrapper = shallowMount(Fab)
        const iTag = wrapper.find('i')

        expect(iTag.classes('fa-plus')).toBeTruthy()

    })

    test('debe de mostrar el icono por argumento: fa-circle', () => {
        
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')

        expect(iTag.classes('fa-circle')).toBeTruthy()



    })

    test('debe de emitir el evento on:click cuando se hace click', () => {
        
        const wrapper = shallowMount(Fab)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)

    })
    
    

})
