import Button from 'components/Button';
import HideCheckBox from 'components/HideCheckBox';
import SORT_KEY from 'constants/sortKey';
import { CustomButton } from 'pages/recentList/styles';
import React, { Component } from 'react';
import { FilterContainer } from 'pages/recentList/styles';

export default class index extends Component {
  render() {
    const {
      isChecked,
      sortKey,
      toggleBrandLists,
      handleHideExceptItems,
      toggleModal,
    } = this.props;
    return (
      <FilterContainer>
        <CustomButton onClick={toggleBrandLists}>브랜드</CustomButton>
        <div>
          <HideCheckBox
            isChecked={isChecked}
            handleHideExceptItems={handleHideExceptItems}
          />
          <Button onClick={toggleModal}>
            {sortKey === SORT_KEY.RECENT ? '최근 조회 순' : '낮은 가격 순'}
          </Button>
        </div>
      </FilterContainer>
    );
  }
}
