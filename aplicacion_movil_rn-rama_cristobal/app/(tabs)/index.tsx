import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';

const Formulario: React.FC = () => {
  const [numeroMedidor, setNumeroMedidor] = useState(''); // Número de serie

  const handleNumeroMedidorChange = (text: string) => {
    const soloNumeros = text.replace(/[^0-9]/g, ''); // Solo números permitidos
    setNumeroMedidor(soloNumeros);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
  
    // Agrega los campos requeridos
    formData.append('numero_serie', numeroMedidor);
    formData.append('fecha_instalacion', new Date().toISOString().split('T')[0]); 
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/registrar-medidor/', {
        method: 'POST',
        // NO se establece el 'Content-Type', ya que fetch lo hace automáticamente con FormData
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Medidor registrado correctamente');
        console.log('Respuesta del servidor:', data);
  
        // Limpia el formulario
        setNumeroMedidor('');
      } else {
        console.error('Error del servidor:', data);
        alert(`Error al registrar: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error al enviar los datos al servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../../assets/images/react-logo.png')} 
        style={styles.logo}
      />

      {/* Título */}
      <Text style={styles.title}>Ingresa los datos necesarios para completar tu registro</Text>
      <View style={styles.separator} /> {/* Línea azul */}

      {/* Número de Medidor */}
      <Text style={styles.label}>Número de medidor:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de medidor"
        value={numeroMedidor}
        onChangeText={handleNumeroMedidorChange}
        keyboardType="numeric"
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#007BFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
  },
});

export default Formulario;
