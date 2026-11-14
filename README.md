# NFL Teams Explorer (Expo + React Native + TypeScript)

Browse NFL teams, search by name or city, view sample players, and save favorite teams that persist after the app is closed.

## Run Instructions

Prerequisites: Node.js 18+ and the Expo Go app on a phone (or an iOS/Android emulator).

**Option A: clone this repository**

```bash
git clone <your-repo-url>
cd NFLTeams
npm install
npx expo start
```

**Option B: add these files to a fresh Expo project**

```bash
npx create-expo-app@latest NFLTeams --template blank-typescript
cd NFLTeams
npx expo install @react-navigation/native @react-navigation/native-stack \
  react-native-screens react-native-safe-area-context \
  @react-native-async-storage/async-storage
# copy App.tsx and the src/ folder into the project, then:
npx expo start
```

Scan the QR code with Expo Go, or press `i` (iOS simulator) / `a` (Android emulator).

## Features

| Requirement | Where |
|-------------|-------|
| 10+ teams in a `FlatList` showing name, city, conference | 12 teams, `TeamListScreen` + `TeamCard` |
| Players per team (name, position, jersey number) | 3 players per team, `TeamDetailScreen` + `PlayerRow` |
| Tap a team to reveal its players | Navigation to `TeamDetail` with a typed `teamId` param |
| Search by name or city | Text input on the list screen (case-insensitive) |
| Add/remove favorites, persisted | ☆/★ button on cards and detail screen; `FavoritesContext` + AsyncStorage |
| Empty state for no search matches | `EmptyState` component (also used for an empty Favorites tab) |
| Loading and error handling | `TeamsContext` exposes `status` (`loading`/`error`/`ready`) with a retry button |
| Touch-friendly UI | 48×48 star buttons, large cards and toggles |

## Data Source

Data comes from a **local JSON file**, `src/data/teams.json`. The team names, cities, and conferences are real public facts about 12 NFL teams. The **players are fictional sample data** created for this assignment (as the assignment allows), so rosters, positions, and jersey numbers do not represent real people. No network access or API key is needed.

The file is read through the async function `loadTeams()` in `src/data.ts`, which adds a short artificial delay so the loading state is visible and the error path is already wired up for a future API.

## Project Structure

```
App.tsx                         Navigation + providers
src/types.ts                    Team, Player, and typed route params
src/theme.ts                    Shared colors
src/data.ts                     loadTeams() data layer
src/data/teams.json             Local dataset
src/TeamsContext.tsx            Loads teams; loading/error state
src/FavoritesContext.tsx        Favorites state + AsyncStorage persistence
src/components/                 TeamCard, PlayerRow, EmptyState
src/screens/                    TeamListScreen, TeamDetailScreen
```

## Reflection

State in this app lives in three places. Screen-level state uses useState: the search text, the All/Favorites toggle, and the loading or error status of the data request. Favorites are needed by several screens, so they live in a React Context provider exposing toggleFavorite and isFavorite, which avoids passing props through the navigator.

Teams are loaded from a local JSON file through an async function, loadTeams(), which a provider calls in a useEffect on mount. Because it returns a Promise, the screens already handle loading and error states the same way they would for a network request.

Favorites are stored as an array of team IDs. On launch, the provider reads the array from AsyncStorage and parses the JSON. A second effect writes it back whenever it changes. A loaded flag stops the empty starting array from overwriting saved data before the read finishes, which is why favorites survive a full restart.

To use a live API, I would change only loadTeams(): call fetch with the endpoint, check response.ok, parse the JSON, and map the result onto my Team type. I would also need an API that offers teams and rosters, an API key kept in environment variables, timeouts and retry logic, and possibly cached responses in AsyncStorage for offline use. The screens would stay the same.
