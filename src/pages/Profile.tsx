import PageHeader from '../components/layout/PageHeader'
import { NotificationSettings } from '../features/profile/components/NotificationSettings'
import { ProfileCard } from '../features/profile/components/ProfileCard'
import { ProfileForm } from '../features/profile/components/ProfileForm'
import { useProfile } from '../hooks/useProfile'

const Profile = () => {
  const {
    name,
    email,
    joinedDate,
    notifications,
    photoUrl,
    handleToggle,
    handleNameChange,
    handlePhotoChange,
  } = useProfile()

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Profile" />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.7fr]">
        <ProfileCard
          name={name}
          joinedDate={joinedDate}
          photoUrl={photoUrl}
          onNameChange={handleNameChange}
          onPhotoChange={handlePhotoChange}
        />
        <ProfileForm email={email} />
      </div>

      <NotificationSettings notifications={notifications} onToggle={handleToggle} />
    </div>
  )
}

export default Profile