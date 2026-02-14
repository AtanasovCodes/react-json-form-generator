export const mockApi = {
    fetchUserData: async ({ firstName, lastName }: { firstName: string; lastName: string }) => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({
                    fullName: `${firstName} ${lastName}`,
                    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
                });
            }, 800)
        );
    },

    fetchAddress: async ({ postalCode }: { postalCode: string }) => {
        console.log(`Fetching address for postal code: ${postalCode}`);
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({
                    city: 'Sofia',
                    country: 'Bulgaria',
                });
            }, 600)
        );
    },
};
