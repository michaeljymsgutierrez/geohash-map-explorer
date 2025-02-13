# Geohash Map Explorer

**Overview**

Geohash Map Explorer is a web application that provides an interactive visualization of the Geohash system. It allows you to explore how geographic coordinates are encoded into a hierarchical grid of increasingly smaller regions. The application features an interactive map where you can:

- **Explore the Geohash Grid:** Seamlessly zoom and pan across the world map and observe how the Geohash system recursively subdivides the Earth into a hierarchical grid of increasingly smaller regions.
- **Visualize Geohash Prefixes:** View colored regions on the map representing different Geohash prefixes at various levels of granularity.
- **View Geohash Information:** Hover or click on a Geohash box to display its corresponding prefix.

**Technologies Used**

- **Next.js:** [https://nextjs.org/](https://nextjs.org/)
- **Leaflet:** [https://leafletjs.com/](https://leafletjs.com/) (for map interactions)
- **antd:** [https://ant.design/components/overview/](https://ant.design/components/overview/) (for UI components)
- **use-debounce:** [https://www.npmjs.com/package/use-debounce](https://www.npmjs.com/package/use-debounce) (for debouncing map updates)
- **TypeScript:** [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

**Project Setup**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/michaeljymsgutierrez/geohash-map-explorer.git
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
