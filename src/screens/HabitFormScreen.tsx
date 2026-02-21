import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHabits } from '../context/HabitContext';
import { RootStackParamList, HabitFormData } from '../types/habit';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitForm'>;

const CATEGORIES = ['saúde', 'exercício', 'alimentação', 'mental'];
const FREQUENCY = ['diário', 'semanal'];

const HabitFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const { habitId } = route.params;
  const { addHabit, updateHabit, getHabit } = useHabits();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [frequency, setFrequency] = useState(FREQUENCY[0]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (habitId) {
      const habit = getHabit(Number(habitId));
      if (habit) {
        setTitle(habit.title);
        setDescription(habit.description || '');
        setCategory(habit.category);
      }
    }
  }, [habitId, getHabit]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Titulo e Obrigatorio';
    }

    if (!category) {
      newErrors.category = 'Categoria e Obrigatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const formData: HabitFormData = {
        title: title,
        description: description || '',
        category,
        frequency: frequency,
      };

      if (habitId) {
        await updateHabit(Number(habitId), formData);
        Alert.alert('Success', 'Habito atualizado com sucesso!');
      } else {
        await addHabit(formData);
        Alert.alert('Success', 'Habito criado com sucesso!');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Falha ao Salvar',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {habitId ? 'Editar Habito' : 'Novo Habito'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Titulo do Habito *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Entre Com o Titulo do habito"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Entre com a descrição (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoria *</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Frequencia</Text>
          <View style={styles.categoryGrid}>
            {FREQUENCY.map(frq => (
              <TouchableOpacity
                key={frq}
                style={[
                  styles.categoryButton,
                  frequency === frq && styles.categoryButtonActive,
                ]}
                onPress={() => setFrequency(frq)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    frequency === frq && styles.categoryButtonTextActive,
                  ]}
                >
                  {frq}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {habitId ? 'Atualizar' : 'Criar'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#40C4FF',
    borderColor: '#40C4FF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#40C4FF',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default HabitFormScreen;
