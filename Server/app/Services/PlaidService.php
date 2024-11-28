<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class PlaidService
{
    protected $client;
    protected $config;

    public function __construct()
    {
        $this->config = config('services.plaid');
        $this->client = new Client([
            'base_uri' => $this->getBaseUri(),
            'headers' => [
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    protected function getBaseUri()
    {
        switch ($this->config['environment']) {
            case 'sandbox':
                return 'https://sandbox.plaid.com/';
            case 'development':
                return 'https://development.plaid.com/';
            case 'production':
                return 'https://production.plaid.com/';
            default:
                return 'https://sandbox.plaid.com/';
        }
    }

    /**
     * Exchange public_token for access_token
     *
     * @param string $publicToken
     * @return array
     * @throws \Exception
     */
    public function exchangePublicToken(string $publicToken): array
    {
        try {
            $response = $this->client->post('item/public_token/exchange', [
                'json' => [
                    'client_id' => $this->config['client_id'],
                    'secret' => $this->config['secret'],
                    'public_token' => $publicToken,
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // Handle exceptions as needed
            throw new \Exception('Error exchanging public token: ' . $e->getMessage());
        }
    }

    // Add more methods as needed for other Plaid API endpoints
}
