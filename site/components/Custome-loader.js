import Link from 'next/link';
import '../styles/styles.scss';
import ContentLoader from 'react-content-loader';
const CustomerLoader = (props) => (
    <div>
        {
            props.type == 'details' ? <ContentLoader
                height={400}
                width={400}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb">
                <rect x="0" y="0" width="400" height="10" />

                <rect x="0" y="20" width="20" height="10" />
                <rect x="30" y="20" width="300" height="10" />
                <rect x="340" y="20" width="60" height="10" />

                <rect x="0" y="40" width="400" height="10" />
                <rect x="0" y="60" width="400" height="60" />

                <rect x="0" y="130" width="20" height="10" />
                <rect x="30" y="130" width="300" height="10" />
                <rect x="340" y="130" width="60" height="10" />

                <rect x="0" y="150" width="190" height="80" />
                <rect x="200" y="150" width="200" height="80" />

                <rect x="0" y="240" width="70" height="10" />
                <rect x="80" y="240" width="400" height="10" />

                <rect x="0" y="260" width="70" height="10" />
                <rect x="80" y="260" width="400" height="10" />

                
                
            </ContentLoader> : ''
        }
        {
            props.type == 'list' ? <ContentLoader
                height={400}
                width={400}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb">
                <rect x="0" y="0" width="400" height="10" />

                <rect x="0" y="20" width="20" height="10" />
                <rect x="30" y="20" width="300" height="10" />
                <rect x="340" y="20" width="60" height="10" />

                <rect x="0" y="40" width="400" height="10" />
             </ContentLoader> : ''
        }
        {
            props.type == 'reminder' ? <ContentLoader
            height={400}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"

        >
            <rect x="0" y="0" width="400" height="10" />

            <rect x="0" y="20" width="20" height="10" />
            <rect x="30" y="20" width="300" height="10" />
            <rect x="340" y="20" width="60" height="10" />

            <rect x="0" y="40" width="400" height="10" />
            <rect x="0" y="60" width="400" height="60" />

            <rect x="0" y="130" width="20" height="10" />
            <rect x="30" y="130" width="300" height="10" />
            <rect x="340" y="130" width="60" height="10" />

        </ContentLoader>: ''
        }
 {
            props.type == 'popup' ? <ContentLoader
            height={400}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"

        >
            <rect x="0" y="0" width="400" height="10" />

            <rect x="0" y="20" width="20" height="10" />
            <rect x="30" y="20" width="300" height="10" />
            <rect x="340" y="20" width="60" height="10" />

            <rect x="0" y="40" width="400" height="10" />
            <rect x="0" y="60" width="400" height="60" />

           

        </ContentLoader>: ''
        }

    </div>

)



export default CustomerLoader;