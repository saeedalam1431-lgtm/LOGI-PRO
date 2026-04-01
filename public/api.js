// Central API Service for DigitalOcean Database
const API_URL = 'http://localhost:3000';

const Database = {
    // 1. Data Save (Safe for Import & Export)
    async save(endpoint, data) {
        try {
            const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            const response = await fetch(`${API_URL}${path}`, {
                method: 'POST',
                mode: 'cors', // Browser security fix
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server Error');
            }
            return await response.json(); 
        } catch (error) {
            console.error("❌ Database Save Error:", error.message);
            throw error;
        }
    },

    // 2. Data Mangwane ke liye (Safe for Import & Export)
    async fetchAll(endpoint) {
        try {
            const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            const response = await fetch(`${API_URL}${path}`, {
                method: 'GET',
                mode: 'cors'
            });
            
            if (!response.ok) throw new Error('Failed to fetch data');
            return await response.json();
        } catch (error) {
            console.error("❌ Database Fetch Error:", error.message);
            throw error;
        }
    },

    // 3. Data Delete (Safe for Import & Export)
    async delete(endpoint, id) {
        try {
            const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            const response = await fetch(`${API_URL}${path}/${id}`, {
                method: 'DELETE',
                mode: 'cors'
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Delete failed');
            return result; 
        } catch (error) {
            console.error("❌ Database Delete Error:", error.message);
            throw error;
        }
    },

    // 4. Data Update (Safe for Import & Export)
    async update(endpoint, id, data) {
        try {
            const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            const response = await fetch(`${API_URL}${path}/${id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Update failed');
            }
            return await response.json();
        } catch (error) {
            console.error("❌ Database Update Error:", error.message);
            throw error;
        }
    }
};