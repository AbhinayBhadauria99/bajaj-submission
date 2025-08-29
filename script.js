const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' key must be present and it must be an array."
            });
        }

        const user_id = "abhinay_singh_bhadauria_25032004"; 
        const email = "abhinaysinghbhadauria2022@vitbhopal.ac.in"; 
        const roll_number = "23BCE10552"; 

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let all_alphabetic_chars = [];


        data.forEach(item => {
            if (!isNaN(parseFloat(item)) && isFinite(item)) {
                const num = parseFloat(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString()); 
                } else {
                    odd_numbers.push(item.toString()); 
                }
            } 
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); 
                all_alphabetic_chars.push(...item.split(''));
            } 
            else {
                special_characters.push(item);
            }
        });

        const reversed_chars = all_alphabetic_chars.reverse();
        const concat_string = reversed_chars.map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');


        const response = {
            is_success: true, 
            user_id: user_id, 
            email: email, 
            roll_number: roll_number, 
            odd_numbers: odd_numbers, 
            even_numbers: even_numbers, 
            alphabets: alphabets, 
            special_characters: special_characters, 
            sum: sum.toString(), 
            concat_string: concat_string 
        };

        res.status(200).json(response); 

    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "An internal server error occurred.",
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});