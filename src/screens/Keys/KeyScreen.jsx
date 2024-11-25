import React, { useEffect } from 'react'
import Header from '../../components/misc/Header'
import { getKeyGenerationStatus, getNumOfKeys, startKeyGeneration } from '../../API'

function KeyScreen() {
	const [isGenerating, setIsGenerating] = React.useState(false)
	const [statusLink, setStatusLink] = React.useState(null)
	const [progress, setProgress] = React.useState(0.0)
	const [btnText, setBtnText] = React.useState(null)
	const [statusText, setStatusText] = React.useState('')

	const renderProgressBar = () => {
		if (!isGenerating) return null
		return (
			<div className='w-full h-4 bg-gray-300 rounded-md'>
				<div
					className='bg-secondary h-full rounded-md'
					style={{ width: `${progress}%` }}
				></div>
			</div>
		)
	}

	const generateKeys = async () => {
		setIsGenerating(true)
		setStatusLink(null)
		setProgress(0)
		setBtnText('Generating...')
		setStatusText('Starting key generation...')
		// Call the API to generate keys
		const res = await startKeyGeneration().catch(() => { setStatusText('Failed to start key generation.'); });
		if (!res) return;
		setStatusText('Key generation started.');
		setStatusLink(res.statusLink);
	}

	useEffect(() => {
		let interval;
		if (isGenerating && statusLink) {
			setStatusText(`Key generation staus: ${progress.toFixed(0)}%`)
			interval = setInterval(async () => {
				const data = await getKeyGenerationStatus(statusLink.split('/').pop()).catch(() => null);
				if (data) {
					setProgress((data.completed / data.total) * 100);
					console.log(data)
					if (progress >= 100) {
						setBtnText('Generate Keys');
						setIsGenerating(false);
						clearInterval(interval);
						const { totalKeys } = await getNumOfKeys();
						setStatusText(`Successfully generated ${totalKeys} keys.`);
					}
				} else {
					setStatusText('Failed to get key generation status.');
				}
			}, 400);
		}
	
		return () => clearInterval(interval); // Cleanup on unmount
	}, [isGenerating, statusLink, progress]);

	return (
		<div className='flex flex-col w-full h-screen items-center justify-evenly'>
			<Header title='Key Generation Tool' />
			<div className='flex flex-row justify-center items-start gap-4 h-4/5 w-5/6'>
				<div className='w-1/2 bg-primary rounded-lg shadow-md p-4 flex flex-col items-center justify-start'>
					<h2 className='text-xl text-primary-content font-bold mb-4'>Start Key Generation</h2>
					<button
						id='generate-keys'
						className='bg-slate-200 text-primary-content px-4 py-2 rounded-md hover:bg-slate-300'
						onClick={() => generateKeys()}
						disabled={isGenerating}
					>
						{btnText || 'Generate Keys'}
					</button>
					<div className='mt-4 w-full'>{renderProgressBar()}</div>
					<p className='text-sm text-secondary-content mt-4' id='status-text'> 
						{statusText}
					</p>
				</div>
			</div>
		</div>
	)
}

export default KeyScreen