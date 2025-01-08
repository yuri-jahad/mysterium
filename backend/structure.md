# Game System Structure

## Authentication Types

* **DISCORD_AUTH** *(HTTP)*
* **GUEST_AUTH** *(HTTP)*

## Authentication Process

### 1. Discord Connection *(HTTP)*

* Discord Authentication Flow
* Store Discord User ID
* Enable Full Access

### 2. Guest Mode *(HTTP)*

* Temporary ID Generation
* LocalStorage Token Storage
* Basic Feature Access

### 3. Session Management *(Socket)*

* Inactivity Timeout (60 minutes)
* Automatic Token Reconnection

## Navigation

### 1. Lobby Events

* `CREATE_ROOM` *(HTTP)*
* `JOIN_ROOM` *(Socket)*
* `SEARCH_ROOM` *(HTTP)*

### 2. Room Events *(Socket)*

* `LEAVE_ROOM`
* `START_GAME`
* `CONFIGURE_ROOM`

## Communication *(Socket)*

* `SEND_MESSAGE`
* `REPLY_TO_MESSAGE`
* `DELETE_MESSAGE`
* `CLEAR_ALL_MESSAGES`

## Game Events *(Socket)*

* `JOIN_GAME`
* `SUBMIT_WORD`
* `WORD_VALIDATED`
* `WORD_REJECTED`
* `END_GAME`

## Game States *(Socket)*

### 1. Waiting

* Room created, waiting for players

### 2. Preparation

* Players ready, countdown active

### 3. In Progress

* Game active
* Timer running
* Word validation active

### 4. Completed

* Final scores
* Game statistics
* Replay option

*Note: Les événements marqués (Socket) nécessitent une communication en temps réel via Socket.io, tandis que ceux marqués (HTTP) utilisent des requêtes HTTP standard.*