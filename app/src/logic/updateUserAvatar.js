

function updateUserAvatar(userId, avatarURL) {
    try {
        const response = fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ avatar: avatarURL }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const updatedUserData = response.json();
        return updatedUserData;
    } catch (error) {
        console.error('Error updating user avatar:', error);
        throw error;
    }
}

export default updateUserAvatar
