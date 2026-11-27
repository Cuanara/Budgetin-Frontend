import { useFulfilledPrompt } from '../hooks/useFulfilledPrompt'
import { useSavingNotifier } from '../hooks/useSavingNotifier'
import { useWishlist } from '../hooks/useWishlist'
import WishlistArchiveNotice from './WishlistArchiveNotice'
import WishlistExpiredModal from './WishlistExpiredModal'
import WishlistFulfilledModal from './WishlistFulfilledModal'
import WishlistInsufficientModal from './WishlistInsufficientModal'
import WishlistSufficientModal from './WishlistSufficientModal'

const ExpiredWishlistGate = () => {
  const { expiredItem, hasInsufficient, hasSufficient, decideItem } =
    useWishlist()
  const { fulfillItem, answerYes, answerNo } = useFulfilledPrompt()
  useSavingNotifier()

  const renderModal = () => {
    if (fulfillItem) {
      return (
        <WishlistFulfilledModal
          onYes={answerYes}
          onNo={answerNo}
        />
      )
    }
    if (hasSufficient) return <WishlistSufficientModal />
    if (hasInsufficient) return <WishlistInsufficientModal />
    if (expiredItem) {
      return <WishlistExpiredModal item={expiredItem} onDecide={decideItem} />
    }
    return null
  }

  return (
    <>
      {renderModal()}
      <WishlistArchiveNotice />
    </>
  )
}

export default ExpiredWishlistGate