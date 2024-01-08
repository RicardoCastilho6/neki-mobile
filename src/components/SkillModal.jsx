import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput,Image} from 'react-native';



const SkillModal = ({ isVisible, onClose, skill, onDelete, onSaveLevel,novoLevel,setNovoLevel }) => {
  

  const handleSaveLevel = async () => {
    try {
      if (skill && skill.level !== undefined) {
        console.log('level',novoLevel)
        await onSaveLevel(skill.id, novoLevel);
      } else {
        console.error('Skill inválida ou sem a propriedade level');
      }
    } catch (error) {
      console.error('Erro ao salvar o level da skill do usuário', error);
    } finally {
      onClose();
    }
  };

  const handleInputChange = (text) => {
    setNovoLevel(text);  
    
  };
  

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ backgroundColor: '#e0e0e0', padding: 20, borderRadius: 10,width:'70%',height:'50%',opacity:1 ,borderColor:'black',borderWidth:3}}>
          {skill ? ( 
            <>
            <View style={{alignItems:'center'}}>
            <Image style={{ width: '30%', height: '40%'}} source={{ uri: skill.skill.imgUrl }} />
            </View>
            <View style={{marginTop: '-20%'}}>
            <Text style={{fontSize: 20}}>Nome: {skill.skill.nome}</Text>
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize: 20}}>Level:</Text>
              <TextInput
                style={{fontSize:20}}
                value={novoLevel}
                onChangeText={handleInputChange}
                placeholder= {skill.level.toString()}
                placeholderTextColor="black"
              />
              </View>   
              <Text style={{fontSize: 20}}>Descrição: {skill.skill.descricao}</Text>
            </View>  
          
              
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop: 30}}>
                <TouchableOpacity onPress={handleSaveLevel} style={{backgroundColor:'blue',padding:10,borderRadius: 10}}>
                  <Text style={{fontSize: 15,color:'white'}}>Salvar Level</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(skill.id)} style={{backgroundColor:'blue',padding:10,borderRadius: 10}}>
                  <Text style={{fontSize: 15,color:'white'}}>Excluir</Text>
                </TouchableOpacity>        
              </View>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={onClose} style={{backgroundColor:'blue',padding:10,borderRadius: 10}}>
                  <Text style={{fontSize: 15, color:'white'}}>Fechar</Text>
                </TouchableOpacity>
                </View>
            </>
          ) : (
            <Text>Skill inválida</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SkillModal;