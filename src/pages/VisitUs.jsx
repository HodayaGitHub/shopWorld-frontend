import { StoreMap } from "../cmps/StoreMap"



export function VisitUs() {
    return (
        <div className="store">
            <h2>Store Locations</h2>
            
            <section className="map-container">
                <StoreMap />
            </section>

        </div>
    )

}