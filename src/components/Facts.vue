<template>
  <div class="facts">
    <el-alert v-if="errorMessage" :title="errorMessage" type="error" />
    <el-table v-loading="loading" :data="facts" style="width: 100%">
      <el-table-column prop="username" data-test="post" label="username" width="auto" />
      <el-table-column prop="textdescription" label="description" width="auto" />
      <el-table-column prop="updatedat" label="last updated" width="auto" />
      <el-table-column fixed="right" label="Operations" width="auto">
      <template #default="scope">
        <el-button id="update" size="small" @click="updateHandler(scope.row)"
          >Update</el-button>
        <el-button id="delete" size="small" type="danger" @click="deleteHandler(scope.row.id)">
          Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus';

export default {
  name: 'facts',
  data() {
    return {
      facts: [],
      loading: null,
      errorMessage: null,
    };
  },
  methods: {
    async fetchFacts() {
      try {
        this.errorMessage = null;
        this.loading = ref(true);

        const url = 'http://localhost:3000/cat/fromSource';
        const response = await axios.get(url);

        this.loading = ref(false);
        this.facts = response?.data?.length > 0 ? this.prepareFacts(response.data) : [];
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    prepareFacts(data) {
      return data.map((item) => {
        const factDate = new Date(item.updatedat);
        const shorterFormat = factDate.toString().split(' ').slice(0, 4).join(' '); // need the shorter clear version
        const updateAt = {
          updatedat: shorterFormat,
        };
        return Object.assign(item, updateAt);
      });
    },
    async updateHandler(obj) {
      try {
        const { update } = await this.promptHandler(obj.textdescription);
        if (update.value.trim() === obj.textdescription) {
          this.showMessage('similar facts!, try again', 'info');
          return;
        }

        const url = `http://localhost:3000/cat/facts/${obj.id}`;
        await axios.put(url,
          { text: update.value });

        this.fetchFacts();
        this.showNotification('You have update the cat fact');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async confirmDeleteHandler() {
      try {
        const confirmed = await ElMessageBox.confirm(
          'The fact will permanently be deleted. Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          },
        );
        return Promise.resolve({ confirmed });
      } catch (err) {
        this.showMessage('Delete canceled', 'info');
        return Promise.reject(err);
      }
    },
    async deleteHandler(id) {
      try {
        const { confirmed } = await this.confirmDeleteHandler();
        if (confirmed) {
          const url = `http://localhost:3000/cat/facts/${id}`;
          await axios.delete(url);

          this.fetchFacts();
          this.showNotification('You have deleted the cat fact');
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    showNotification(message) {
      ElNotification({
        title: 'Success',
        message,
        type: 'success',
      });
    },
    showMessage(message, type) {
      ElMessage({
        message,
        type,
      });
    },
    async promptHandler(fact) {
      try {
        const update = await ElMessageBox.prompt('Please update the cat fact', 'Update', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputValue: fact,
          inputValidator: (value) => {
            let info;
            if (value.trim() === '' || value === null) info = 'input cannot be empty!';
            return info;
          },
        });
        return Promise.resolve({ update });
      } catch (error) {
        this.showMessage('Update canceled', 'info');
        return Promise.reject(error);
      }
    },
  },
  mounted() {
    this.fetchFacts();
  },
};
</script>
