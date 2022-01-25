import { mount, flushPromises } from '@vue/test-utils';
import Facts from '@/components/Facts.vue';
import ElementPlus from 'element-plus';
import axios from 'axios';

const mockFact = [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this is the first",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  },
  {
    id: 3,
    username: "6a9ac18c7478810ea6c06381",
    textdescription: "this is the second",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
];

const mockFactUpdate = [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this has been updated",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  },
  {
    id: 3,
    username: "6a9ac18c7478810ea6c06381",
    textdescription: "this is the second",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
]

const mockFactDelete = [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this has been updated",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
]

jest.mock('axios', () => ({
  get: jest.fn(() => mockFact),
  put: jest.fn(() => mockFactUpdate),
  delete: jest.fn(() => mockFactDelete),
}))

test('does the wrapper exist', async () => {
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
  // expect(facts[0].text()).toContain('5a9ac18c7478810ea6c06381');
})

test('should call updateHandler when update is clicked', async () => {
  const wrapper = mount(Facts, {
    plugins: [ElementPlus],
  });

  await wrapper.get('el-button#update').trigger('click');

  expect(axios.put).toHaveBeenCalledTimes(1);
  expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/cat/facts/2');

  await flushPromises();

  const facts = wrapper.findAll('[data-test="username"]');
  expect(facts).toHaveLength(1);
  // expect(facts[0].text()).toContain('this has been updated');
})

test('should call deleteHandler when delete is clicked', async () => {
  const wrapper = mount(Facts, {
    plugins: [ElementPlus],
  });

  await wrapper.get('el-button#delete').trigger('click');

  expect(axios.delete).toHaveBeenCalledTimes(1);
  expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/cat/facts/3');

  await flushPromises();

  const facts = wrapper.findAll('[data-test="username"]');
  expect(facts).toHaveLength(1);
  // expect(facts[0].text()).toContain('this has been updated');
})
