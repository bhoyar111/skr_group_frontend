import React, { useState, useEffect } from 'react';
import {
	Grid, List, Card, CardHeader, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Divider
} from '@material-ui/core';
import { useStylesDualChkBox } from '../../../../utils/useStyle';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function CGCheckBoxForm(props) {

    const { subCrops, values, setValues } = props;

	const classes = useStylesDualChkBox();
	const [checked, setChecked] = useState([]);
	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

  	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
		// my code to get data from right side

		const rightArr = right.concat(leftChecked);
		let newDocArr = [];
		rightArr.forEach((selDocId) => {
			let pushObj = {
				sub_crop_id : selDocId
			};
			newDocArr.push(pushObj);
		})

		setValues({
			...values,
			farmercropgrowns : newDocArr
		});
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
        // my code to get data from right side

		const rightArr = not(right, rightChecked);
		let newDocArr = [];
		rightArr.forEach((selDocId) => {
			let pushObj = {
				sub_crop_id : selDocId
			};
			newDocArr.push(pushObj);
		})

		setValues({
			...values,
			farmercropgrowns : newDocArr
		});
	};

	useEffect(() => {
		const { farmercropgrowns } = values;

		let newRighArr = [];
		farmercropgrowns.forEach(farmergrown => {
			newRighArr.push(farmergrown.sub_crop_id);
		});

		let newLeftArr = [];
		subCrops.forEach(farmerchecklist => {
			if( !newRighArr.includes(farmerchecklist.id) ) newLeftArr.push(farmerchecklist.id);
		});
		setLeft(newLeftArr);

		setRight(newRighArr);
	},[subCrops]);

	const customList = (title, items, myDataArr) => (
		<Card className={classes.listCard}>
			<CardHeader
				className={classes.cardHeader}
				avatar={
				<Checkbox
					onClick={handleToggleAll(items)}
					checked={numberOfChecked(items) === items.length && items.length !== 0}
					indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
					disabled={items.length === 0}
					inputProps={{ 'aria-label': 'all items selected' }}
				/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} Listing`}
			/>
			<Divider className={classes.listDivider} />
			<List className={classes.list} dense component="div" role="list">
				{items && items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;
					const myLabel = myDataArr.find((servicelist) => servicelist.id === value);

					return (
						<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									color="primary"
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${myLabel && myLabel.sub_crop_name && myLabel.sub_crop_name}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
    );

	return (
		<Grid container spacing={2} alignItems="center" className={classes.root}>
			<Grid item className={classes.transgridItem}>{customList('Farmer Crop Grown', left, subCrops)}</Grid>
			<Grid item className={classes.transgridItem}>
				<Grid container direction="column" alignItems="center">
				<Button
					variant="outlined"
					size="small"
					className={classes.button}
					onClick={handleCheckedRight}
					disabled={leftChecked.length === 0}
					aria-label="move selected right"
				>
					&gt;
				</Button>
				<Button
					variant="outlined"
					size="small"
					className={classes.button}
					onClick={handleCheckedLeft}
					disabled={rightChecked.length === 0}
					aria-label="move selected left"
				>
					&lt;
				</Button>
				</Grid>
			</Grid>
			<Grid item className={classes.transgridItem}>{customList('Selected Crop', right, subCrops)}</Grid>
		</Grid>
	);
}
