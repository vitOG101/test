#bash

mkdir data
cd public
mkdir storage
cd ../data
echo "[]" > banners.json
echo '{"wallet":"","links":{"x":"","discord":"","doc":"","gitbook":"","ads": ""}}' > config.json
echo "[]" > emails.json
echo "[]" > sponsors.json
echo '{"email":"admin@app.com","password":"$2a$12$X/yJdObE6f0XWL5cXq7eLez8eUWMJPc0gT/je8F30dAOuFbqGd0pO"}' > user.json
cd ..