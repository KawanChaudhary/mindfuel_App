import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {AuthContext} from '../../Contexts/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddStoryModal from './AddStoryModal';

const {width, height} = Dimensions.get('window');

const AddStoryButton = () => {
  const {theme} = useContext(ThemeContext);
  const {auth} = useContext(AuthContext);

  const [addStoryModalVisible, setAddStoryModalVisible] = useState(false);

  return (
    <>
      {auth && (
        <TouchableOpacity
          style={[styles.contiainer, {backgroundColor: theme.colors.secondary}]}
          onPress={() => setAddStoryModalVisible(true)}>
          <AddStoryModal
            visible={addStoryModalVisible}
            closeModal={setAddStoryModalVisible}
          />
          <MaterialCommunityIcons
            name="square-edit-outline"
            color="white"
            size={30}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default AddStoryButton;

const styles = StyleSheet.create({
  contiainer: {
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.03,
    borderRadius: (height * 0.1 + width * 0.1) / 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
