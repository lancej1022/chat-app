# Therapist Matching System Design

## Overview

A simplified therapist matching system that helps clients find therapists with higher therapeutic fit based on age preferences and scheduling compatibility, reducing overwhelm during the provider search process.

## Goals

- Create a streamlined therapist matching flow parallel to the existing search system
- Enable clients to input their weekly availability preferences for therapy sessions
- Allow clients to specify age preferences for potential therapists
- Present up to three provider profiles with the highest predicted therapeutic fit
- Connect clients to the existing booking flow for their selected provider
- Reduce abandoned searches by simplifying the selection process
- Increase average therapeutic fit for new clients

## Assumptions & Simplifications

- All providers in the system are active and accepting new clients
- Client insurance coverage and state of residence requirements are handled separately
- Provider booking page URLs follow a consistent format: `/providers/{providerId}/book`
- Clients can specify up to 10 preferred time slots per week
- Providers' availability data is kept up-to-date through the existing system
- Provider profiles contain all necessary information for display in matching results
- Client preferences are temporary and only used for the current matching session
- The existing booking system handles appointment creation after match selection

## Technical Design

### Executive Summary

The therapist matching system will create a simplified flow where clients input their availability preferences and desired therapist age range. Using this information, the system will calculate compatibility scores by analyzing provider availability data and demographic information. The highest-scoring matches (up to three) will be presented to the client, who can then select a provider to proceed with the existing booking flow. This approach reduces choice overload while optimizing for factors that correlate with therapeutic fit.

### Architecture

The matching system consists of four primary components:

1. **Client Preference Interface**: Collects client availability and therapist age preferences
2. **Matching Engine**: Scores providers based on compatibility with client preferences
3. **Results Display**: Shows the top matches (up to three) to the client
4. **Integration Layer**: Connects with the existing provider database and booking system

![Architecture Diagram]

```
Client → Client Preference Interface → Matching Engine ← Provider Database
                                        ↓
                                    Results Display → Booking System
```

The matching engine will pull provider data from the existing database, calculate compatibility scores based on client preferences, and return the top matches. When a client selects a provider, they'll be directed to the standard booking flow.

### User Interaction

1. **Entry Point**: Client opts into the matching flow from the main search page
2. **Preference Collection**:
   - Client is presented with a weekly calendar view to select preferred time slots
   - Client specifies desired therapist age range using a simple slider or dropdown
3. **Results Page**:
   - System displays up to three provider cards with photos, names, and brief descriptions
   - Each card indicates % match based on availability and age preference
   - Clear CTA to view full profile or proceed directly to booking
4. **Booking Flow**:
   - Client is directed to the existing provider booking page
   - Available times that match client preferences are highlighted

The interface will be simple and focused, minimizing cognitive load while guiding the client toward providers with higher therapeutic fit.

### API

#### Client Preference Submission

```
POST /api/matching/preferences
Request:
{
  "availabilityPreferences": [
    {
      "dayOfWeek": "MONDAY",
      "startTime": "18:00",
      "endTime": "20:00"
    },
    // Up to 10 time slots
  ],
  "therapistAgePreference": {
    "minAge": 30,
    "maxAge": 45
  }
}

Response:
{
  "preferenceId": "pref_123456",
  "status": "received"
}
```

#### Get Matches

```
GET /api/matching/results?preferenceId=pref_123456
Response:
{
  "matches": [
    {
      "providerId": "provider_789",
      "name": "Dr. Jane Smith",
      "imageUrl": "https://example.com/providers/789/image",
      "compatibilityScore": 92,
      "availabilityMatch": 85,
      "ageMatch": 100,
      "bookingUrl": "/providers/provider_789/book"
    },
    // Up to 2 more matches
  ]
}
```

### Data Persistence & Retrieval

#### Provider Data

We'll use the existing Provider, TherapySession, and Availability data structures with no modifications. The system will access this data through read-only APIs to:

- Retrieve provider demographic information (calculating age from dateOfBirth)
- Access provider availability windows
- Check upcoming booked sessions

#### Client Preferences

Client preferences will be stored temporarily (24 hours) in a simple key-value store:

```
ClientPreference {
  preferenceId: String
  createdAt: DateTime
  availabilityPreferences: List[TimeSlot]
  therapistAgePreference: AgeRange
}

TimeSlot {
  dayOfWeek: Enum(MONDAY, TUESDAY, ...)
  startTime: Time
  endTime: Time
}

AgeRange {
  minAge: Integer
  maxAge: Integer
}
```

#### Matching Algorithm

The matching algorithm calculates two scores:

1. **Availability Score**: Percentage of client's preferred slots that overlap with provider's availability
2. **Age Compatibility**: Score based on how well provider's age fits within client's preferred range

These scores are weighted and combined to create a final compatibility score. Providers are ranked by this score, and the top three are returned.

### Alternatives

#### Alternative 1: Comprehensive Matching System

A more complex matching system could incorporate additional factors such as therapist specialties, treatment approaches, gender preferences, and cultural backgrounds. However, this would require significant additional data collection and a more complex interface, potentially overwhelming clients—contradicting our goal of simplification.

#### Alternative 2: Quiz-Based Approach

Instead of direct input of preferences, we could guide clients through a personality quiz to determine appropriate matches. While this might feel more personalized, it would introduce a longer onboarding process and might not directly address the scheduling challenges that often cause abandonment.

#### Alternative 3: AI-Based Matching

Machine learning could potentially identify patterns in successful therapeutic relationships and automate matching. However, this would require extensive historical data on therapeutic outcomes and client satisfaction, which we may not have. The simpler, more transparent approach allows us to test our hypothesis with less complexity.

#### Alternative 4: Unlimited Matches

We could show all compatible providers rather than limiting to three. However, research on choice overload suggests that fewer, higher-quality options often lead to better satisfaction and reduced abandonment.
