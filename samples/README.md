# Sample Responses

This directory contains sample API responses and screenshots demonstrating the Smart Scheduler functionality.

## API Response Examples

### 1. Create Post (Success)
```json
POST /api/posts
{
  "success": true,
  "data": {
    "id": "abc123def",
    "content": "Excited to share our latest product update! 🚀 #innovation #tech",
    "scheduledFor": "2024-01-15T14:30:00.000Z",
    "platform": "twitter",
    "status": "pending",
    "createdAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### 2. List Posts
```json
GET /api/posts
{
  "success": true,
  "data": [
    {
      "id": "abc123def",
      "content": "Excited to share our latest product update! 🚀 #innovation #tech",
      "scheduledFor": "2024-01-15T14:30:00.000Z",
      "platform": "twitter",
      "status": "pending",
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

### 3. Get Credits
```json
GET /api/credits
{
  "success": true,
  "data": {
    "totalCredits": 24,
    "raffleEntries": 12,
    "lastUpdated": "2024-01-15T14:30:15.000Z"
  }
}
```

### 4. Error Response
```json
POST /api/posts (with missing content)
{
  "success": false,
  "error": "Missing required fields: content, scheduledFor, platform"
}
```

## Key Features Demonstrated

- ✅ Post creation with validation
- ✅ Automatic scheduling and publishing
- ✅ Credit system (2 credits per published post)
- ✅ Raffle entry calculation (1 entry per 2 credits)
- ✅ Error handling with descriptive messages
- ✅ Real-time status updates
- ✅ Platform-specific post management

## Testing Scenarios

1. **Happy Path**: Create → Schedule → Auto-publish → Earn credits
2. **Manual Publishing**: Create → Manual publish → Immediate credit award
3. **Validation**: Try creating posts with missing/invalid data
4. **Time Validation**: Attempt to schedule posts in the past
5. **Error Recovery**: Simulate publish failures and retry logic