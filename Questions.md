#What is the purpose of using sessions?

Sessions are used for cookie-based authentication for repeated API requests without having to be re-authorized.

#What does bcrypt do to help us store passwords in a secure manner.

It is a one-way multi-round hashing function that forces best practices by requiring a randomly generated salt as part of the hashing process.

#What does bcrypt do to slow down attackers?

It uses the Blowfish cipher which is computationally expensive to create keys with, and uses a variable number of iterations to increase the workload and duration of the hash functions.

#What are the three parts of the JSON Web Token?

Header - Used to describe how the token was encrypted such as the hashing algorithm etc.
Body - Used to store data in the token
Cryptographic Signature - Used to confirm the validity of the token