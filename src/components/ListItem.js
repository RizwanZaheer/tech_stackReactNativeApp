import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    LayoutAnimation.spring();
  }

  renderDescription() {
    console.log('working');
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={styles.descriptionStyle}>
            {library.description}
          </Text>
        </CardSection>
      );
    }
  }
  render() {
    const { id, title } = this.props.library;
    const { titleStyle } = styles;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
  descriptionStyle: {
    paddingLeft: 20,
    paddingRight: 10,
  }
}

// ownProps = this.props in component level 
const mapstateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
}

export default connect(mapstateToProps, actions)(ListItem);