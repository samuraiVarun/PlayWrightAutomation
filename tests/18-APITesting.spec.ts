import { test, expect } from '@playwright/test';

test.describe('Playwright API Testing', () => {

    test('Perform GET, POST, PUT and DELETE operations', async ({ request }) => {

        console.log('\n========== GET REQUEST ==========');

        // -------------------------------
        // GET Request
        // -------------------------------

        const getResponse = await request.get(
            'https://jsonplaceholder.typicode.com/posts/1'
        );

        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        console.log(getBody);

        expect(getBody.id).toBe(1);

        expect(getBody.userId).toBe(1);

        expect(getBody.title).toBeTruthy();



        console.log('\n========== POST REQUEST ==========');

        // -------------------------------
        // POST Request
        // -------------------------------

        const postPayload = {

            title: 'Playwright API',

            body: 'Learning API Testing',

            userId: 100

        };

        const postResponse = await request.post(

            'https://jsonplaceholder.typicode.com/posts',

            {

                data: postPayload

            }

        );

        expect(postResponse.status()).toBe(201);

        const postBody = await postResponse.json();

        console.log(postBody);

        expect(postBody.title).toBe(postPayload.title);

        expect(postBody.body).toBe(postPayload.body);



        console.log('\n========== PUT REQUEST ==========');

        // -------------------------------
        // PUT Request
        // -------------------------------

        const putPayload = {

            id: 1,

            title: 'Updated Title',

            body: 'Updated Body',

            userId: 1

        };

        const putResponse = await request.put(

            'https://jsonplaceholder.typicode.com/posts/1',

            {

                data: putPayload

            }

        );

        expect(putResponse.status()).toBe(200);

        const putBody = await putResponse.json();

        console.log(putBody);

        expect(putBody.title).toBe('Updated Title');



        console.log('\n========== DELETE REQUEST ==========');

        // -------------------------------
        // DELETE Request
        // -------------------------------

        const deleteResponse = await request.delete(

            'https://jsonplaceholder.typicode.com/posts/1'

        );

        expect(deleteResponse.status()).toBe(200);

        console.log('Record Deleted Successfully');

    });

});