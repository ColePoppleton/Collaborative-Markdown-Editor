<template>
  <p>Test</p>
  <div class="editor-container">
    <div class="menu-bar" v-if="editor">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        H3
      </button>
      <button v-if="editor" @click="logout">Logout</button>
    </div>
    <div class="editor-content">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import {useEditor, EditorContent} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
import {onMounted, onBeforeUnmount, ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import io from 'socket.io-client';

export default {
  components: {
    EditorContent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const socket = ref(null);
    const isSocketConnected = ref(false);

    const editor = useEditor({
      extensions: [
        StarterKit,
        Heading,
        Italic,
        Bold
      ],
      content: store.getters.getDocumentContent,
      onUpdate({editor}) {
        const content = editor.getHTML();
        store.dispatch('updateDocumentContent', content);
        if (isSocketConnected.value) {
          socket.value.emit('documentChange', content);
        }
      },
    });

    const connectSocket = () => {
      socket.value = io('http://localhost:4000');

      socket.value.on('connect', () => {
        console.log('Connected to Socket.IO');
        isSocketConnected.value = true;
      });

      socket.value.on('documentUpdate', (data) => {
        if (editor.value) {
          editor.value.commands.setContent(data, false);
        }
      });

      socket.value.on('disconnect', () => {
        console.log('Disconnected from Socket.IO');
        isSocketConnected.value = false;
      });
      socket.value.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
        isSocketConnected.value = false;
      });
    };

    onMounted(() => {
      if (editor.value) {
        editor.value.commands.focus();
      }
      connectSocket();
    });

    onBeforeUnmount(() => {
      if (socket.value) {
        socket.value.disconnect();
      }
    });

    const logout = () => {
      store.dispatch('logout');
      router.push('/login');
    };

    return {editor, logout, isSocketConnected};
  },
};
</script>

<style scoped>
.editor-container {
  border: 1px solid #ccc;
  margin: 20px;
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.menu-bar {
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.menu-bar button {
  background-color: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.menu-bar button.is-active {
  background-color: #bbb;
}

.editor-content {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>