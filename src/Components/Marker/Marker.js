import React from 'react'

function Marker() {
    const [newMarker, setNewMarker] = React.useState([0,0,false]),
          [markers, setMarkers] = React.useState([]),
          [hasContent, SethasContent] = React.useState(false),
          titleInput = document.querySelector("input.title"),
          descInput = document.querySelector("input.description");

    const createMarker = (e) => {
        let x = e.clientX,
            y = e.clientY,
            parent = e.target.parentNode,
            imgDiv = parent.childNodes[0];
        
        if (imgDiv.getElementsByTagName('img').length > 0) {
            let img = imgDiv.childNodes[0],
                imgRect = img.getBoundingClientRect(),
                offsetL = x - imgRect.left - 15,
                percentL = ( (offsetL * 100) / img.width),
                offsetT = y - imgRect.top - 40, 
                percentT = (offsetT * 100) / img.height;

            percentL = percentL > 80 ? percentL - 16: percentL;
            percentT = percentT > 80 ? percentT - 16: percentT;
            
            setNewMarker([percentT,percentL,true])
        }
    }
    const saveMarker = (e) => {
        let marker = e.target.parentNode,
            title = marker.querySelector(".title input").value,
            description = marker.querySelector(".description input").value,
            id = 0,
            top = newMarker[0],
            left = newMarker[1];
       
        if (markers.length>0)
            id = markers[markers.length-1].id;
        id +=1;
        
        setMarkers(markers.concat({id, top, left, title, description}))
        setNewMarker([newMarker[0],newMarker[1],false])
        
        titleInput.value="";
        descInput.value="";
        SethasContent(false)
    }
    const handleChange = () => {
        if (titleInput.value!=="" && descInput.value!=="")
            SethasContent(true)
        else
            SethasContent(false)
    }
    const removeMarker = (e) => {
        let target = e.target.parentNode,
            marker = target.parentNode,
            index = marker.dataset.key;
            
        markers.splice(index - 1, 1)
        setMarkers(markers)
        setNewMarker([0,0,false])
    }
    return (
        <div className="markers" onClick={createMarker}>
            <div className={`new-marker ${newMarker[2] ? `on` : ``}`} style={{top: newMarker[0] !== "undefined" ? `${newMarker[0]}%` : ``, left: newMarker[1] !== "undefined" ? `${newMarker[1]}%` : ``}}>
                <div className="title">
                    <input type="text" onChange={handleChange} className="title" placeholder="Set title"></input>
                </div>
                <div className="description">
                    <input type="text" onChange={handleChange} className="description" placeholder="Set Description"></input>
                </div>
                <div className="submit" role="button" onClick={saveMarker} style={{opacity : hasContent ? 1 : 0.4, pointerEvents: hasContent ? "all": "none"}}>
                    set marker
                </div>
            </div>
            {
                markers.length > 0 &&
                    markers.map(marker => {
                        return (
                            <div className="marker" key={marker.id} data-key={marker.id} style={{top: `${marker.top}%`, left: `${marker.left}%`}}>
                                <div className="text">
                                    <div className="title">
                                        {marker.title}
                                    </div>
                                    <div className="description">
                                        {marker.description}
                                    </div>
                                </div>
                                <div className="actions">
                                    <div className="close" onClick={removeMarker}></div>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    );
}
export default Marker;