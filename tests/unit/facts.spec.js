import { mount, config } from '@vue/test-utils';
import Facts from '@/components/Facts.vue';
import ElementPlus from 'element-plus';
import axios from 'axios';

// config.compilerOptions.isCustomElement = tag => tag.startsWith('el-table');

describe('Cat Facts Component', () => {

  const mockFact = [{
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this is a test",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }];

  jest.mock('axios', () => ({
    get: jest.fn(() => mockFact)
  }))
  
  test('does the wrapper exist', () => {
    const wrapper = mount(Facts);
    expect(wrapper.exists()).toBe(true)
  })
  
  test('render a fact', async () => {
    const wrapper = mount(Facts, {
      plugins: [ElementPlus],
    });

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/cat/fromSource');

    await flushPromises();

    const facts = wrapper.findAll('[data-test="username"]');
    expect(facts).toHaveLength(1);
    expect(facts[0].text()).toContain('5a9ac18c7478810ea6c06381');
  })

  // test('should call updateHandler when update is clicked', () => {
  //   const wrapper = mount(Facts, {
  //     plugins: [ElementPlus],
  //   });
  //   const updateHandler = jest.fn();
  //   wrapper.setMethods({
  //     updateHandler: updateHandler
  //   });
  //   wrapper.find('button[id="update"]').trigger('click');

  //   expect(updateHandler).toHaveBeenCalled();
  // })

  // test('should call updateHandler when update is clicked', () => {
  //   const wrapper = mount(Facts, {
  //     plugins: [ElementPlus],
  //   });
  //   const updateHandler = jest.fn();
  //   wrapper.setMethods({
  //     updateHandler: updateHandler
  //   });
  //   wrapper.find('button#update').trigger('click');

  //   expect(updateHandler).toHaveBeenCalled();
  // })

  // test('should call deleteHandler when delete is clicked', () => {
  //   const deleteHandlerMock = jest.fn();
  //   const wrapper = mount(Facts, {
  //     plugins: [ElementPlus],
  //     methods: {
  //       deleteHandler: deleteHandlerMock
  //     }
  //   });
  //   wrapper.find('button#delete').trigger('click');

  //   expect(deleteHandlerMock).toHaveBeenCalled();
  // })

})
