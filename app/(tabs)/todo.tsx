import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookOpen } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { styles_ai, styles_learn } from '../stylesheet';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Helper functions for archive management
export async function getArchivedTodos() {
  const stored = await AsyncStorage.getItem('todos_archive');
  return stored ? JSON.parse(stored) : [];
}

export async function setArchivedTodos(archive: Todo[]) {
  await AsyncStorage.setItem('todos_archive', JSON.stringify(archive));
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [archive, setArchive] = useState<Todo[]>([]);

  // Load todos and archive from AsyncStorage on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem('todos');
        if (stored) setTodos(JSON.parse(stored));
        const archived = await AsyncStorage.getItem('todos_archive');
        if (archived) setArchive(JSON.parse(archived));
      } catch (e) {}
    };
    loadTodos();
  }, []);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save archive to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('todos_archive', JSON.stringify(archive));
  }, [archive]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      { id: Date.now().toString(), text: input.trim(), completed: false },
      ...prev,
    ]);
    setInput('');
  };

  // Move to archive when checked, move back when unchecked
  const toggleTodo = (id: string, isArchive = false) => {
    if (!isArchive) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        // Move to archive (always set completed: true)
        setTodos(prev => prev.filter(t => t.id !== id));
        setArchive(prev => [ { ...todo, completed: true }, ...prev ]);
      }
    } else {
      const todo = archive.find(t => t.id === id);
      if (todo) {
        // Move back to todos (always set completed: false)
        setArchive(prev => prev.filter(t => t.id !== id));
        setTodos(prev => [ { ...todo, completed: false }, ...prev ]);
      }
    }
  };

  // Delete from archive or todos
  const deleteTodo = (id: string, isArchive = false) => {
    if (isArchive) {
      setArchive(prev => prev.filter(todo => todo.id !== id));
    } else {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  };

  return (
    <View style={[styles_ai.gradientBg, { backgroundColor: Colors.dark.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }} showsVerticalScrollIndicator={false}>
          <View style={[styles_ai.bubbleGlass, { backgroundColor: Colors.dark.card }]}>
            <View style={{ padding: 24 }}>
              <Text style={[styles_ai.title, { textAlign: 'center', marginBottom: 8 }]}>Todo List</Text>
              <Text style={[styles_ai.subtitle, { textAlign: 'center', marginBottom: 18 }]}>Stay organized and track your tasks</Text>
              <View style={[styles_learn.inputContainer, { borderColor: '#222' }]}>
                <BookOpen color={'#888'} size={20} style={styles_learn.inputIcon} />
                <TextInput
                  style={styles_learn.input}
                  placeholder="Add a new task..."
                  placeholderTextColor={'#fff'}
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={addTodo}
                  returnKeyType="done"
                />
              </View>
              <TouchableOpacity onPress={addTodo} style={[styles_learn.startButton, !input.trim() && styles_learn.disabledButton]} disabled={!input.trim()}>
                <Text style={styles_learn.startButtonText}>Add</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}>
                {todos.length === 0 ? (
                  <Text style={{ color: Colors.dark.muted, textAlign: 'center', marginTop: 40, fontSize: 16 }}>No tasks yet. Add one above!</Text>
                ) : (
                  todos.map(item => (
                    <View key={item.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.dark.card,
                      borderRadius: 14,
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      marginBottom: 12,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.08,
                      shadowRadius: 6,
                      elevation: 2,
                    }}>
                      <TouchableOpacity onPress={() => toggleTodo(item.id)} style={{ marginRight: 14, padding: 4 }}>
                        <IconSymbol name={item.completed ? 'CheckCircle' : 'Circle'} color={item.completed ? '#58cc02' : Colors.dark.muted} width={28} height={28} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleTodo(item.id)}>
                        <Text style={{ color: item.completed ? Colors.dark.muted : Colors.dark.text, fontSize: 18, textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTodo(item.id)} style={{ marginLeft: 10, padding: 4 }}>
                        <IconSymbol name="Trash2" color="#e74c3c" width={28} height={28} />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#101010',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 18,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    backgroundColor: '#181818',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 18,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#58cc02',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 56,
    minHeight: 48,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  checkButton: {
    marginRight: 14,
    padding: 4,
  },
  todoText: {
    color: '#fff',
    fontSize: 18,
  },
  todoTextCompleted: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 4,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
}); 