import DropdownSelectItem from '@/models/components/DropdownSelectItem';
import {useAuth} from "@/store/auth-context";

export const pasteStyleSelectItems: DropdownSelectItem[] = [
    new DropdownSelectItem('Automatic', 'The style will be automatically detected.', null),
    new DropdownSelectItem('Java', null, 'Java'),
    new DropdownSelectItem('YAML', null, 'YAML'),
    new DropdownSelectItem('XML', null, 'XML'),
    new DropdownSelectItem('Error', null, 'less'),
    new DropdownSelectItem('JSON', null, 'JSON'),
    new DropdownSelectItem('HTML', null, 'HTML'),
    new DropdownSelectItem('JavaScript', null, 'JavaScript'),
    new DropdownSelectItem('PHP', null, 'PHP'),
    new DropdownSelectItem('No Style', 'Don\'t apply any styling.', 'none')
];

export const pasteVisibilitySelectItems: DropdownSelectItem[] = [
    new DropdownSelectItem('Public', 'Anyone can view this paste.', 'PUBLIC'),
    new DropdownSelectItem('Unlisted', 'Only people with the link can view this paste.', 'UNLISTED', () => useAuth().loggedIn()),
    new DropdownSelectItem('Private', 'Only you can view this paste.', 'PRIVATE', () => useAuth().loggedIn())
];

export const pasteLifetimeSelectItems: DropdownSelectItem[] = [
    new DropdownSelectItem('7 days', null, '7d'),
    new DropdownSelectItem('2 weeks', null, '2w'),
    new DropdownSelectItem('1 month', null, '1m', () => useAuth().loggedIn()),
    new DropdownSelectItem('3 months', null, '3m', () => useAuth().loggedIn() && useAuth().user?.role === 'admin'),
    new DropdownSelectItem('Unlimited', 'This paste will never expire.', 'never', () => useAuth().loggedIn() && useAuth().user?.role === 'admin')
];
