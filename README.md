````markdown
# Geohash Map Explorer

This React application allows you to visualize and explore the Geohash system by displaying a map with colored regions corresponding to different Geohash prefixes.

**Overview**

The Geohash Map Explorer is a React application that allows you to visualize and explore the Geohash system. It provides an interactive map interface where you can:

- **Select a location:** Click on any point on the map to see the corresponding Geohash boxes highlighted.
- **View Geohash Information:** Get the precise Geohash string for the selected location and see the associated Geohash boxes at different precision levels.
- **Explore Geohash Grid:** Understand how the Geohash system divides the Earth into a hierarchical grid of increasingly smaller regions.

**How it Works**

1.  **Map Rendering:** The application renders a base map using Leaflet.
2.  **Click Handling:** When a user clicks on the map, the application captures the clicked coordinates.
3.  **Geohash Calculation:** The application calculates the Geohash string based on the clicked coordinates (you'll need to implement this logic).
4.  **Box Rendering:** The application overlays Geohash boxes on the map, highlighting the boxes that correspond to the calculated Geohash string at different precision levels.
5.  **Information Display:** The application displays the calculated Geohash string, its corresponding latitude and longitude, and the dimensions (width and height) of the Geohash box.

**Features**

- **Interactive Map:** Explore the world map and see how Geohash prefixes divide the Earth into grid-like regions.
- **Click-to-Geohash:** Click on any point on the map to see the corresponding Geohash boxes highlighted.
- **Geohash Information:** View the Geohash string for the selected location and see the associated Geohash boxes at different precision levels.
- **Zoom and Pan:** Explore the map freely using intuitive zoom and pan controls.

**Technologies Used**

- Next.js
- Leaflet (for map interactions)
- antd (for UI components)
- use-debounce (for debouncing map updates)
- TypeScript

**Project Setup**

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/michaeljymsgutierrez/geohash-map-explorer.git](https://github.com/michaeljymsgutierrez/geohash-map-explorer.git)
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd geohash-map-explorer
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

**Developing**

- To start the development server:

    ```bash
    npm run dev
    ```

**Building**

- To build the production version of the application, run:

    ```bash
    npm run build
    ```

This will create an optimized build of your application in the `build` folder.
````
