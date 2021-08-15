import React, { Component } from 'react';
import CardList from 'components/CardList/index';
import PageTitle from 'components/Text/pageTitle';
import LinkButton from 'components/LinkButton/index';
import BrandLists from 'components/BrandLists/index';
import SortFilter from 'components/SortFilter';
import FilterLists from 'components/FilterLists';
import Modal from 'Modals';
import * as LSWorker from 'services/localStorageWorker';
import { sortProductByKey } from 'services/sortProductByKey.js';
import ROUTES from 'constants/routesPath.js';
import PAGE_TITLE from 'constants/pageTitle.js';
import SORT_KEY from 'constants/sortKey.js';
import { RecentListContainer, HeaderContainer } from './styles';
import ModalPortal from 'Modals/ModalPortal';

class RecentList extends Component {
  _isMounted = false;

  state = {
    products: [],
    selectedBrands: [],
    isChecked: false,
    brandClick: false,
    brand: '',
    sortKey: SORT_KEY.RECENT,
    isModalShow: false,
  };

  componentDidMount() {
    this._isMounted = true;
    const products = LSWorker.getRecentList();
    this._isMounted && this.setState({ products });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleHideExceptItems = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  toggleBrandLists = () => {
    this.setState({ brandClick: !this.state.brandClick });
  };

  handleSortChange = sortKey => {
    this.setState({ sortKey });
  };

  toggleModal = () => {
    this.setState({ isModalShow: !this.state.isModalShow });
  };

  setSelectedBrands = name => {
    const { selectedBrands } = this.state;
    let newSelectedBrands;

    if (name === 'all') {
      newSelectedBrands = [];
    } else if (!selectedBrands.includes(name)) {
      newSelectedBrands = [...selectedBrands, name];
    } else {
      newSelectedBrands = selectedBrands.filter(brand => brand !== name);
    }

    this.setState({ selectedBrands: newSelectedBrands });
  };

  filterProducts = () => {
    const { products, isChecked, sortKey, selectedBrands } = this.state;
    const notInterested = LSWorker.getNotInterested();
    const _products = products
      .filter(product =>
        !isChecked ? product : !notInterested.includes(product.id),
      )
      .filter(product =>
        !selectedBrands.length
          ? product
          : selectedBrands.includes(product.brand),
      );

    return sortProductByKey(_products, sortKey);
  };

  render() {
    const { isChecked, brandClick, selectedBrands, sortKey, isModalShow } =
      this.state;
    const products = this.filterProducts();

    return (
      <RecentListContainer>
        <HeaderContainer>
          <PageTitle title={PAGE_TITLE.RECENT_LIST} />
        </HeaderContainer>
        <FilterLists
          isChecked={isChecked}
          sortKey={sortKey}
          toggleBrandLists={this.toggleBrandLists}
          handleHideExceptItems={this.handleHideExceptItems}
          toggleModal={this.toggleModal}
        />
        <BrandLists
          brandClick={brandClick}
          setSelectedBrands={this.setSelectedBrands}
          selectedBrand={selectedBrands}
        />
        <CardList cards={products} />
        <LinkButton title={PAGE_TITLE.HOME} to={ROUTES.HOME} />
        {isModalShow && (
          <ModalPortal>
            <Modal show={isModalShow} toggleModal={this.toggleModal}>
              <SortFilter
                handleSortChange={this.handleSortChange}
                toggleModal={this.toggleModal}
              />
            </Modal>
          </ModalPortal>
        )}
      </RecentListContainer>
    );
  }
}

export default RecentList;
