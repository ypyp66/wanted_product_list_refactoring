import LS_KEY from 'constants/localStorageKey.js';
import { localStorageHelper as LSHelper } from 'utils/localStorageHelper';

// TODO: 카드를 클릭하면 recentList에 등록해야한다.
export function setItemToRecentList(item) {
  const recentList = getRecentList();
  const existItemIndex = checkAlreadyExistInRecentList(item.id);
  if (existItemIndex !== -1) {
    recentList.splice(existItemIndex, 1);
  }
  recentList.push(item);
  LSHelper.setItem(LS_KEY.RECENT_LIST, {
    date: new Date().toLocaleDateString(),
    data: recentList,
  });
}
// TODO: recentList에 등록할 때 원래 있었는지 체크한다.
export function checkAlreadyExistInRecentList(id) {
  const recentList = getRecentList();
  return recentList.findIndex(item => item.id === id);
}
// TODO: NotInterested에 등록할 때 원래 있었는지 체크한다.
export function checkAlreadyExistInNotInterested(id) {
  const notInterested = getNotInterested();
  return notInterested.includes(id);
}
// TODO: 관심없음 버튼을 클릭하면 notInterested에 등록해야한다.
export function setItemToNotInterested(id) {
  const existItemIndex = checkAlreadyExistInNotInterested(id);

  if (!existItemIndex) {
    LSHelper.setItem(LS_KEY.NOT_INTERESTED, {
      date: new Date().toLocaleDateString(),
      data: [...getNotInterested(), id],
    });
  }
}
// TODO: 랜덤 상품 조회 버튼 클릭시 recentList에서 가져온 후 현재 id객체 제외
export function exceptNowItem(id) {
  return getRecentList().filter(data => data.id !== id);
}
// TODO: 조회목록 페이지에 들어가면 recentList 전부를 리턴해줘야한다.
export function getRecentList() {
  const recentList = LSHelper.getItem(LS_KEY.RECENT_LIST) ?? {
    date: '',
    data: [],
  };
  return recentList.date === new Date().toLocaleDateString()
    ? recentList.data
    : [];
}
export function getNotInterested() {
  const notInterestedList = LSHelper.getItem(LS_KEY.NOT_INTERESTED) ?? {
    date: '',
    data: [],
  };
  return notInterestedList.date === new Date().toLocaleDateString()
    ? notInterestedList.data
    : [];
}
